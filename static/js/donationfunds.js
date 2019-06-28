$(function () {
    if ($('.donationGoal').length > 0) {
        $('.donationGoal').each(function () {
            var goalObj = $(this); var address = goalObj.attr('data-address'); 
            var goal = parseInt(goalObj.attr('data-goal')); 

            var currentDate = new Date();
            var monthStart = Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth());
            var unixTime = Math.floor(monthStart / 1000);

            $.get('https://vtc.blkidx.org/addressTxosSince/' + unixTime + '/' + address, function (data) {
                var vtcBalance = 0;
                for(var i in data) {
                    vtcBalance += data[i]['value'];
                }
                vtcBalance = Math.round(vtcBalance / 1000000); 
                vtcBalance /= 100; 
                var goalPercentage = 100;
                if (!isNaN(goal)) { 
                    goalPercentage = Math.round(vtcBalance / goal * 100); 
                    if (goalPercentage > 100) goalPercentage = 100 
                }
                goalObj.find('.progress-bar').css('width', goalPercentage + '%'); 
                goalObj.find('.progress-bar').attr('aria-valuenow', goalPercentage); 
                goalObj.find('.donationAmount').text(vtcBalance)
            })
        })
    }
})