$(document).ready(function(event){
    $('#addItem').click(function(event){
        
        var add_row = '<div class="inputting"><input type="text" class="form-control" placeholder="Lunch Item" name="lunchItem"><select name="dietDropdown"> <option value="Vegan">Vegan</option> <option value="Veggietarian">Veggietarian</option> <option value="Eggs">Contatins Eggs</option> <option value="Halal">Halal</option> <option value="Nuts">Contains Peanuts</option> <option value="None">None</option> </select><div>'
    


        $('.lunchForm').append(add_row);
        
        
    });


    //submit input
    $('#submitted').click(function(event){
            alert("You have submitted");
            event.preventDefault();
                var data = [];
                var t = 0;
                //var dietData = {};
                //$(".lunchForm input[type=text]").each(function(){
                    //$(".lunchForm input[type=text]").each(function(){
                    //var temp = $(this).val();
                    //console.log(temp);
                    
                    //var dietData = {item: "", diet: ""};
                    var dietData;
                    $('.inputting').children().each(function(){
                        dietData = {item: "", diet: ""};
                        t++
                        console.log(t);
                        console.log($(this).val());
                    
                        //dietData["item"] = $(this).find('#lunchitem').val();
                        //dietData["diet"] = $(this).find('#dietrestriction').val()
                        if($(this).attr('name') === "lunchItem"){
                            //console.log($(this).val());
                            dietData["item"] = $(this).val();
                            if($(this).next().attr('name') === 'dietDropdown'){
                                dietData["diet"] = $(this).next().val();
                                //dietData["diet"] = $('#dietDropdown: selected').text();
                            }
                            /*$('#dietDropdown').on('change', function(){
                                dietData["diet"] = $("#dietDropdown option:selected").text();
                            })*/

                            data.push(dietData);
                        }
                        /*if($(this).attr('name') === 'dietaryRestriction'){
                            //console.log($(this).val());
                            dietData["diet"] = $(this).val();

                        }*/
                        
                        console.log(dietData);
                        //data.push(dietData);

                        return;
                        
                    })
                    //data.push(dietData);
                    

                    //console.log(dietData);
                    //data.push(temp);
                    //data.push(dietData);
                    
                
                
                //console.log(data);


            var data_entry = JSON.stringify(data);
            console.log(data_entry);

            $(location).attr('href');
            var path = window.location.pathname;
            //alert(path);

            $.ajax({
                //url:"/Wingold",
                url: path,
                type:"POST",
                data: data_entry,
                contentType: 'application/json',
                dataType: 'json',
            }).done(function(data){
                if(data){
                    alert("Your entry was saved");
                }
                else{
                    alert("There was an error in saving");
                }
            })
        })
    })
