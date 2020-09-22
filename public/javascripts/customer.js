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

            purchases = JSON.parse(result);

            total = 0;

            for(item of purchases)
            {
                total++;

                data.push({x: moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss'), y: total});
            }

            console.log(data)

            display(data);
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

function display(data)
{
    var trace = {
        type: "scatter",
        mode: "lines",
        name: 'Consos',
        x: unpack(data, 'x'),
        y: unpack(data, 'y'),
        line: {color: '#EF78B1'}
    }

    console.log(trace)
    console.log(data[0].x)
    console.log(getDate(data[0].x))

    var layout = {
        title: 'Nombre de consos',
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
          autorange: true,
          type: 'linear'
        }
      };

      console.log(layout)

      Plotly.newPlot('graph', [trace], layout);
}