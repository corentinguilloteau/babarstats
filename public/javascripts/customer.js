$(document).ready(function ()
{
    parseData();
});

function parseData()
{
    splitted_url = window.location.href.split('/');

    $.ajax({url: "../api/purchase/" + splitted_url[splitted_url.length - 1] , success: function(result)
        {
            data = []
            hist = []

            purchases = JSON.parse(result);

            total = 0;
            sub_total = 0;

            current_date = moment(purchases[0].timestamp);

            for(item of purchases)
            {
                total++;
                
                data.push({x: moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss'), y: total});

                date = moment(item.timestamp);
                date.subtract(4, 'hours');

                console.log(date);
                console.log(date.dayOfYear());

                if(date.dayOfYear() != current_date.dayOfYear() || date.year() != current_date.year())
                {
                  hist.push({x: current_date.format('YYYY-MM-DD') + " 00:00:00", y: sub_total})
                  current_date = date;
                  sub_total = 0;
                  sub_total++;
                }
                else
                {
                  sub_total++;
                }
            }

            hist.push({x: current_date.format('YYYY-MM-DD') + " 00:00:00", y: sub_total})

            display(data, hist);
        }
    });
}

function getDate(date)
{
    return moment(date).format('YYYY-MM-DD');
}

function unpack(rows, key) 
{
    return rows.map(function(row) { return row[key]; });
}

function display(data, hist)
{
    var trace = {
        type: "scatter",
        mode: "lines",
        name: 'Consos',
        x: unpack(data, 'x'),
        y: unpack(data, 'y'),
        line: {color: '#EF78B1'}
    }

    console.log(hist)

    var hist_trace = {
      x: unpack(hist, 'x'),
      y: unpack(hist, 'y'),
      name: 'Consos journalières',
      yaxis: "y2",
      type: "bar", 
    };

    var layout = {
        title: 'Nombre de consos',
        bargap: 0.1, 
        bargroupgap: 0.2, 
        barmode: "overlay",
        xaxis: {
          autorange: true,
          range: [getDate(data[0].x), getDate(data[data.length - 1].x)],
          rangeselector: {buttons: [
              {
                count: 1,
                label: '1m',
                step: 'month',
                stepmode: 'backward'
              },
              {
                count: 6,
                label: '6m',
                step: 'month',
                stepmode: 'backward'
              },
              {step: 'all'}
            ]},
          rangeslider: {range: [getDate(data[0].x), getDate(data[data.length - 1].x)]},
          type: 'date'
        },
        yaxis: {
          title: "Consos cumulées",
          autorange: true,
          type: 'linear',
          overlaying: 'y2',
        },
        yaxis2: {
          title: 'Consos journalières',
          titlefont: {color: 'rgb(255, 127, 14)'},
          tickfont: {color: 'rgb(255, 127, 14)'},
          side: 'right'
        }
      };

      console.log(layout)

      Plotly.newPlot('graph', [trace, hist_trace], layout);
}