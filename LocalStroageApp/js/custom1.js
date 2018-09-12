/// <reference path="js/jquery-3.2.1.min.js" />
$(document).ready(function(){
	$('#addBtn').on('click', saveData);
	showData();
	$('#prImage').on('change',function(e){
		var file = e.originalEvent.target.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(evt){
			$('#holdImg').removeAttr('src');
			$('#holdImg').attr('src', evt.target.result);
		}
	})
});

function saveData(){
	var image = new Image();
	var productName = $('#prName').val();
	var price = $('#prPrice').val();
	var weight = $('#prWeight').val();
	var des = $('#prDes').val();
	image.src = $('#holdImg').attr('src');
	var imgData = image.src;

	var data = {name:productName, price:price, weight:weight, des:des, image:imgData};

	localStorage.setItem('products', JSON.stringify(data));
}


function showData(){
	var data = JSON.parse(localStorage.getItem('products'));
	html='';
	html +='<tr><td>'+data.name+'</td>';
	html +='<td>'+data.des+'</td>';
	html +='<td><img src ="'+data.image+'"/></td>';
	html +='<td>'+data.price+'</td>';
	html +='<td>'+data.weight+'</td></tr>';
	$('#productTable').append(html);
}