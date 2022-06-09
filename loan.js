function startover() {

    document.lease_form.lease_amt.value="";
    document.lease_form.months.value="";
    document.lease_form.rate.value="";
    document.lease_form.extra.value="0";
    document.lease_form.residual.value="";


    document.getElementById("lease_info").innerHTML="";
    document.getElementById("table").innerHTML = "";
    
}

function validate(){

    var lease_amt = document.lease_form.lease_amt.value;
    var months = document.lease_form.months.value;
    var rate = document.lease_form.rate.value;
    var extra = document.lease_form.extra.value;
    var residual = document.lease_form.residual.value;
 // isNaN(number()) checks to see if the user entered a float 
                            
    if (lease_amt <= 0 || isNaN(Number(lease_amt)) ) {
        alert("Please enter a valid lease amount.");
        document.lease_form.lease_amt.value = "";
    }
                            
    else if (months <= 0 || parseInt(months) != months ) {
        alert("Please enter a valid number of months.");
        document.lease_form.months.value = "";
    }
                        
    else if(rate <= 0 || isNaN(Number(rate))) {
        alert("Please enter a valid interest rate.");
        document.lease_form.rate.value = "";
    }
                            
    else if (extra < 0 || isNaN(Number(extra))) {
        alert("Please enter a valid extra payment.");
        document.lease_form.extra.value = "0";
    }

    else if (extra < 0 || isNaN(Number(residual))) {
        alert("Please enter a valid residual.");
        document.lease_form.extra.value = "";
    }

    
    else {
        calculate(parseFloat(lease_amt), parseInt(months), parseFloat(rate), parseFloat(extra), parseFloat(residual));
    }
}


function calculate(lease_amt, months, rate, extra, residual) {
    
    i = rate/100;
    residual = residual/100;
    residual_value = lease_amt * residual;

    // var pmt = (lease_amt*(i/12)*Math.pow((1+i/12), months)) / (Math.pow((1+i/12), months) - 1);
    
    // Payment = Present Value - (Future Value / ( ( 1 + i ) ^n) / [ 1- (1 / (1 +i ) ^ n ) ] / i                    
    // var pmt = lease_amt - [residual_value / Math.pow((1 + (i/12)),months)] / [1 - Math.pow(1/(1 + (i/12)), months )] / i/12;
    // var pmt = (lease_amt*(i/12)*Math.pow((1+(i/12)),months)-residual_value*(i/12))/(Math.pow(1+(i/12),months)-1);
    var pmt = (lease_amt*(i/12))/[1 - Math.pow(1 + (i/12),-months)]
    var info = "";

    info += "<table width='250'>";
    info += "<tr><td>Lease Amount:</td>";
    info += "<td align = 'right'>$"+lease_amt+"</td></tr>";

    info += "<tr><td>Num of Months:</td>";
    info += "<td align = 'right'>"+months+"</td></tr>";

    info += "<tr><td>Interest Rate:</td>";
    info += "<td align = 'right'>"+rate+"%</td></tr>";

    info += "<tr><td>Monthly Payment:</td>";
    info += "<td align = 'right'>$"+round(pmt, 2)+"</td></tr>";
    
    info += "<tr><td>+Extra:</td>";
    info += "<td align = 'right'>$"+extra+"</td></tr>";

    info += "<tr><td>Residual:</td>";
    info += "<td align = 'right'>$"+residual_value+"</td></tr>";

    info += "<tr><td>Total Payment:</td>";
    info += "<td align = 'right'>$"+round(pmt+extra,2)+"</td></tr>";

    info += "</table>";

    document.getElementById("lease_info").innerHTML = info; //info is a string containing all html table code

    //-----------------------------------------------------------------------------

    var table = "";
    table += "<table cellpadding='15' border=<'1'>";
    table += "<tr>";
        table += "<td width='65'>0</td>";
        table += "<td width='60'>&nbsp;</td>";
        table += "<td width='65'>&nbsp;</td>";
        table += "<td width='65'>&nbsp;</td>";
        table += "<td width='85'>&nbsp;</td>";
        table += "<td width='75'>"+round(lease_amt,2)+"</td>";
    table+="</tr>";

    var current_balance = lease_amt;
    var payment_counter = 1;
    var total_interest = 0;
    
    pmt = pmt + extra;
    
    while(current_balance > 0){
        //create rows

        towards_interest = (i/12)*current_balance //calculates the portion of monthly payment that goes towards interest
        
        if(pmt > current_balance) {
            pmt = current_balance + towards_interest;
        }

        towards_balance = pmt - towards_interest;
        total_interest = total_interest + towards_interest;
        current_balance = current_balance - towards_balance;
        
        //display row
        table += "<tr>";
            table += "<td>"+payment_counter+"</td>";
            table += "<td>"+round(pmt,2)+"</td>";
            table += "<td>"+round(towards_balance,2)+"</td>";
            table += "<td>"+round(towards_interest,2)+"</td>";
            table += "<td>"+round(total_interest,2)+"</td>";
            table += "<td>"+round(current_balance,2)+"</td>";
        table+= "</tr>";

        
        payment_counter++;
    }

    

    table += "</table>";

    document.getElementById("table").innerHTML = table;



    }

function round(num, dec) {

    return(Math.round(num*Math.pow(10,dec))/ Math.pow(10,dec)).toFixed(dec);
}