function startover() {
    document.lease_form.price.value="";
    document.lease_form.down_payment.value="";
    document.lease_form.months.value="";
    document.lease_form.rate.value="";
    document.lease_form.residual.value="";
    document.lease_form.early_payoff.value="0";

    document.getElementById("lease_info").innerHTML="";
    document.getElementById("table").innerHTML = "";
    
}

function validate(){

    var price = document.lease_form.price.value;
    var down_payment = document.lease_form.down_payment.value;
    var months = document.lease_form.months.value;
    var rate = document.lease_form.rate.value;
    var residual = document.lease_form.residual.value;
    var early_payoff = document.lease_form.early_payoff.value;
    
 // isNaN(number()) checks to see if the user entered a float 
                            
    if (price <= 0 || isNaN(Number(price)) ) {
        alert("Please enter a valid lease amount.");
        document.lease_form.price.value = "";
    }
    
    else if (down_payment <= 0 || isNaN(Number(down_payment)) ) {
        alert("Please enter a valid lease amount.");
        document.lease_form.down_payment.value = "";
    }
    else if (months <= 0 || parseInt(months) != months ) {
        alert("Please enter a valid number of months.");
        document.lease_form.months.value = "";
    }
                        
    else if(rate <= 0 || isNaN(Number(rate))) {
        alert("Please enter a valid interest rate.");
        document.lease_form.rate.value = "";
    }
    else if (residual < 0 || isNaN(Number(residual))) {
        alert("Please enter a valid residual.");
        document.lease_form.residual.value = "";
    }
 
    else if (early_payoff < 0 || isNaN(Number(early_payoff))) {
        alert("Please enter a valid early_payoff payment.");
        document.lease_form.early_payoff.value = "0";
    }
    
    else {
        calculate(parseFloat(price), parseFloat(down_payment), parseInt(months), parseFloat(rate),  parseFloat(residual), parseFloat(early_payoff));
    }
}


function calculate(price, down_payment, months, rate, residual, early_payoff) {
    
    i = rate/100;
    residual = residual/100;
    

    var lease_amt = price - down_payment;
    var residual_value = lease_amt * residual;
    var pmt = (lease_amt*(i/12))/[1 - Math.pow(1 + (i/12),-months)];
    var toop = (pmt*1.5)+down_payment+595+250;
    
    // var pmt = (lease_amt*(i/12)*Math.pow((1+i/12), months)) / (Math.pow((1+i/12), months) - 1);
    
    // Payment = Present Value - (Future Value / ( ( 1 + i ) ^n) / [ 1- (1 / (1 +i ) ^ n ) ] / i                    
    // var pmt = lease_amt - [residual_value / Math.pow((1 + (i/12)),months)] / [1 - Math.pow(1/(1 + (i/12)), months )] / i/12;
    // var pmt = (lease_amt*(i/12)*Math.pow((1+(i/12)),months)-residual_value*(i/12))/(Math.pow(1+(i/12),months)-1);
    
    var info = "";

    info += "<table width='250'>";
    info += "<tr><td>Financed Amount:</td>";
    info += "<td align = 'right'>$"+round(lease_amt, 2)+"</td></tr>";

    info += "<tr><td>Number of Months:</td>";
    info += "<td align = 'right'>"+months+"</td></tr>";

    info += "<tr><td>Interest Rate:</td>";
    info += "<td align = 'right'>"+rate+"%</td></tr>";

    info += "<tr><td>Monthly Payment:</td>";
    info += "<td align = 'right'>$"+round(pmt, 2)+"</td></tr>";
    
    info += "<tr><td>Residual:</td>";
    info += "<td align = 'right'>$"+round(residual_value,2)+"</td></tr>";

    info += "<tr><td>Total Out of Pocket:</td>";
    info += "<td align = 'right'>$"+round(toop,2)+"</td></tr>";

    info += "<tr><td>+Early Payoff (months):</td>";
    info += "<td align = 'right'>"+early_payoff+"</td></tr>";

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
    
    pmt = pmt + early_payoff;
    
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
        table+= "<tr>";
            table += "<td>"+payment_counter+"</td>";
            table += "<td>"+round(pmt,2)+"</td>";
            table += "<td>"+round(towards_balance,2)+"</td>";
            table += "<td>"+round(towards_interest,2)+"</td>";
            table += "<td>"+round(total_interest,2)+"</td>";
            table += "<td>"+round(current_balance,2)+"</td>";
        table+= "</tr>";

        
        payment_counter++;
        
    }

    while(current_balance == 0){

        if(pmt > current_balance && current_balance == 0){
            var payment_counter = months + 1
            var pmt = residual_value;
            var towards_balance = 0;
            var towards_interest = 0;
            var total_interest = 0;
            var current_balance = residual_value;

        }

        table+= "<tr>";
        table += "<td>"+payment_counter+"</td>";
        table += "<td>"+round(pmt,2)+"</td>";
        table += "<td>"+round(towards_balance,2)+"</td>";
        table += "<td>"+round(towards_interest,2)+"</td>";
        table += "<td>"+round(total_interest,2)+"</td>";
        table += "<td>"+round(current_balance,2)+"</td>";
    table+= "</tr>";

    }

    table += "</table>";

    document.getElementById("table").innerHTML = table;

    }

function round(num, dec) {

    return(Math.round(num*Math.pow(10,dec))/ Math.pow(10,dec)).toFixed(dec);
}