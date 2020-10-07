data = [];

payments = []
toProcess = [];

barPk = [2, 5, 6, 8, 9, 10, 11, 12, 14, 17, 18, 19, 20, 23, 25]

yearFilter = [2022, 2023];

totalCustomerCount = 0;
processedCustomer = 0;

$(document).ready(function () 
{
    $('#table_id').DataTable(
        {
            "createdRow": function(row, data, dataIndex){
                if(data[5] ==  1){
                    if(data[4] == 2023)
                    {
                        $(row).addClass('red');
                    }
                    else
                    {
                        $(row).addClass('orange');
                    }
                    
                }
                else
                {
                    if(data[4] == 2023)
                    {
                        if(data[5] ==  1){
                            $(row).addClass('green');
                        }
                    }
                }
                
                
            },
            "columnDefs": [
                { 
                    "visible": false, "targets": 5
                },
                { 
                    "visible": false, "targets": 0
                },
                {
                    "targets": -1,
                    "data": null,
                    "defaultContent": "<button>+</button>"
                }
              ]
        }
    );

    load();

    $('#table_id tbody').on( 'click', 'button', function () {
        var data = $("#table_id").DataTable().row( $(this).parents('tr') ).data();
        window.location.href="./customer/" + data[0];
    } );
});

function load()
{
    data = [];
    payments = [];
    toProcess = [];

    totalCustomerCount = 0;
    processedCustomer = 0;

    console.log("Requesting purchases");
    $.ajax({url: "api/payments" , success: function(result){
        payments = JSON.parse(result);

        console.log("Requesting customers");
        $.ajax({url: "api/customers", success: function(result){
            
            query_data = JSON.parse(result);

            for(i = 0; i <  query_data.length; i++)
            {
                if(yearFilter.indexOf(query_data[i].year) > -1)
                {
                    toProcess.push(query_data[i]);
                    totalCustomerCount++;
                }
            }

            processedCustomer = 0;

            toProcess.forEach(item => loadCustomer(item));

            updateData();

        }});
    }});
}

function updateData()
{
    $('#table_id').DataTable().clear();
    $('#table_id').DataTable().rows.add(data);
    $('#table_id').DataTable().draw();
}

function loadCustomer(item)
{
    customerTotalPayments = 0;

    for(j = 0; j < payments.length; j++)
    {
        if(payments[j].customer == parseInt(item.pk))
        {
            price = payments[j].amount;

            customerTotalPayments += parseInt(price*100);

        }
    }

    bar = 0;

    for(k = 0; k < barPk.length; k++)
    {
        if(barPk[k] == item.status.id)
        {
            bar = 1
        }
    }
    
    customer = [item.pk, item.lastname, item.firstname, (customerTotalPayments - parseInt(item.balance*100))/100, item.year, bar];

    data.push(customer);

    processedCustomer++;
}

function refreshData()
{
    button = $("#refreshButton");

    button.prop("disabled", true);
    button.html("Veuillez patienter");

    $.ajax({url: "api/refresh" , timeout: 0, success: function(result)
    {
        button.prop("disabled", false);
        button.html("Rafraichir les données");

        load();
    }});

}

//-----------------------------------------------------------------------
// Part of the LINQ to JavaScript (JSLINQ) v2.10 Project - http://jslinq.codeplex.com
// Copyright (C) 2013 Chris Pietschmann (http://pietschsoft.com). All rights reserved.
// This project is licensed under the MIT License
// This license can be found here: http://jslinq.codeplex.com/license
//-----------------------------------------------------------------------
(function() {
    JSLINQ = function(dataItems) {
        return new JSLINQ.fn.init(dataItems);
    };
    JSLINQ.fn = JSLINQ.prototype = {
        init: function(dataItems) {
            var item;
            var newArray = new Array();

            // The clause was passed in as a Method that return a Boolean
            for (var index = 0; index < this.items.length; index++) {
                if (clause(this.items[index], index)) {
                    newArray[newArray.length] = this.items[index];
                }
            }
            return new JSLINQ(newArray);
        },
        Select: function(clause) {
            var item;
            var newArray = new Array();

            // The clause was passed in as a Method that returns a Value
            for (var i = 0; i < this.items.length; i++) {
                if (clause(this.items[i])) {
                    newArray[newArray.length] = clause(this.items[i]);
                }
            }
            return new JSLINQ(newArray);
        },
        OrderBy: function(clause) {
            var tempArray = new Array();
            for (var i = 0; i < this.items.length; i++) {
                tempArray[tempArray.length] = this.items[i];
            }
            return new JSLINQ(
            tempArray.sort(function(a, b) {
                var x = clause(a);
                var y = clause(b);
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            })
        );
        },
        OrderByDescending: function(clause) {
            var tempArray = new Array();
            for (var i = 0; i < this.items.length; i++) {
                tempArray[tempArray.length] = this.items[i];
            }
            return new JSLINQ(
            tempArray.sort(function(a, b) {
                var x = clause(b);
                var y = clause(a);
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            })
        );
        },
        SelectMany: function(clause) {
            var r = new Array();
            for (var i = 0; i < this.items.length; i++) {
                r = r.concat(clause(this.items[i]));
            }
            return new JSLINQ(r);
        },
        Count: function(clause) {
            if (clause == null)
                return this.items.length;
            else
                return this.Where(clause).items.length;
        },
        Distinct: function(clause) {
            var item;
            var dict = new Object();
            var retVal = new Array();
            for (var i = 0; i < this.items.length; i++) {
                item = clause(this.items[i]);
                // TODO - This doens't correctly compare Objects. Need to fix this
                if (dict[item] == null) {
                    dict[item] = true;
                    retVal[retVal.length] = item;
                }
            }
            dict = null;
            return new JSLINQ(retVal);
        },
        Any: function(clause) {
            for (var index = 0; index < this.items.length; index++) {
                if (clause(this.items[index], index)) { return true; }
            }
            return false;
        },
        All: function(clause) {
            for (var index = 0; index < this.items.length; index++) {
                if (!clause(this.items[index], index)) { return false; }
            }
            return true;
        },
        Reverse: function() {
            var retVal = new Array();
            for (var index = this.items.length - 1; index > -1; index--)
                retVal[retVal.length] = this.items[index];
            return new JSLINQ(retVal);
        },
        First: function(clause) {
            if (clause != null) {
                return this.Where(clause).First();
            }
            else {
                // If no clause was specified, then return the First element in the Array
                if (this.items.length > 0)
                    return this.items[0];
                else
                    return null;
            }
        },
        Last: function(clause) {
            if (clause != null) {
                return this.Where(clause).Last();
            }
            else {
                // If no clause was specified, then return the First element in the Array
                if (this.items.length > 0)
                    return this.items[this.items.length - 1];
                else
                    return null;
            }
        },
        ElementAt: function(index) {
            return this.items[index];
        },
        Concat: function(array) {
            var arr = array.items || array;
            return new JSLINQ(this.items.concat(arr));
        },
        Intersect: function(secondArray, clause) {
            var clauseMethod;
            if (clause != undefined) {
                clauseMethod = clause;
            } else {
                clauseMethod = function(item, index, item2, index2) { return item == item2; };
            }

            var sa = secondArray.items || secondArray;

            var result = new Array();
            for (var a = 0; a < this.items.length; a++) {
                for (var b = 0; b < sa.length; b++) {
                    if (clauseMethod(this.items[a], a, sa[b], b)) {
                        result[result.length] = this.items[a];
                    }
                }
            }
            return new JSLINQ(result);
        },
        DefaultIfEmpty: function(defaultValue) {
            if (this.items.length == 0) {
                return defaultValue;
            }
            return this;
        },
        ElementAtOrDefault: function(index, defaultValue) {
            if (index >= 0 && index < this.items.length) {
                return this.items[index];
            }
            return defaultValue;
        },
        FirstOrDefault: function(defaultValue) {
            return this.First() || defaultValue;
        },
        LastOrDefault: function(defaultValue) {
            return this.Last() || defaultValue;
        }
    };
    JSLINQ.fn.init.prototype = JSLINQ.fn;
})();