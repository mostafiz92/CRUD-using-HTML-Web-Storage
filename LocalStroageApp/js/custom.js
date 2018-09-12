///<reference path="js/jquery-3.2.1.min.js"/>
$(document).ready(function(){
	productNamespace.init();
});

(function(){
	this.productNamespace = this.productNamespace || {};
	var ns = this.productNamespace;
	var currentProduct;

	ns.init = function(){
		$('#prImage').on('change', bindImage);
		$('#addBtn').on('click', function(e){
			e.preventDefault();
			ns.save();
		});
		$('#clearBtn').on('click', ns.clearProduct);
		ns.display();
	}

	function bindImage(e){
		var file = e.originalEvent.target.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(evt){
			var result = evt.target.result;
			$('#holdImg').removeAttr('src');
			$('#holdImg').attr('src', result);
		}
	}

	function productRetreive(){
		var allProduct = JSON.parse(localStorage.getItem('products'));
		return allProduct ? allProduct : [];
	}

	ns.display = function (){
		currentProduct = {key:null, product:{}};
		var results = productRetreive();
		bindToGrid(results);
	}

	function bindToGrid(results){
		var html='';
		for(var i = 0; i<results.length; i++){
			var product = results[i];
			html +='<tr><td class="displayImg"><img class="img-responsive" src="'+product.image+'"/></td>';
			html +='<td>'+product.name+'</td>';
			html +='<td>'+product.price+'</td>';
			html +='<td>'+product.weight+'</td>';
			html +='<td>'+product.brif+'</td>';
			html +='<td><a class="edit" href="javascript:void(0)" data-key="'+i+'"><i class="fa fa-edit"></i></a></td>';
			html +='<td><a class="delete" href="javascript:void(0)" data-key="'+i+'"><i class="fa fa-trash"></i></a></td></tr>';
		}
		html = html || '<tr><td colspan="7">No Records Available</td></tr>';
		$('#productTable').html('<table id="productTable" class="table table-responsive table-bordered">' +
							'<tr><th>Photo</th><th>Name</th><th>Student Id</th>' +
								'<th>Contact No</th><th>Email</th><th>Edit</th><th>Delete</th>' +
							'</tr></table>');
		$('#productTable').append(html);
		$('a.edit').on('click', ns.loadProduct);
		$('a.delete').on('click', ns.deleteProduct);
	}

	ns.deleteProduct = function(){
		var key = parseInt($(this).attr('data-key')); 
		var results = productRetreive();
		$.each(results, function(index, obj){
	        results.splice(key,1);
	        localStorage.setItem('products', JSON.stringify(results));
	        ns.display();
	        return false;
		});
	}

	ns.loadProduct = function(){
		var key = parseInt($(this).attr('data-key'));
		var results = productRetreive();
		$('#headStatus, #addBtn').html('Update Student');
		$('.getImg-status').html('change image');
		currentProduct = {key:key, product:results[key]};
		displayCurrentProduct();
	}

	function displayCurrentProduct(){
		var product = currentProduct.product;
		$('#stName').val(product.name);
		$('#prPrice').val(product.price);
		$('#prWeight').val(product.weight);
		$('#prDes').val(product.brif);
		$('#holdImg').attr('src', product.image);
	}

	ns.save = function(){
		var img = new Image();
		var product = currentProduct.product;
		product.name = $('#stName').val();
		product.price = $('#prPrice').val();
		product.weight = $('#prWeight').val();
		product.brif = $('#prDes').val();
		img.src = $('#holdImg').attr('src');
		product.image = img.src;

		var results = productRetreive();

		if(currentProduct.key != null){
		    results[currentProduct.key] = product;
            localStorage.setItem('products', JSON.stringify(results));
			clearInput();
			ns.display();
		}
		else {
			if(product.name && product.price && product.weight){
				results.push(product);
				localStorage.setItem('products', JSON.stringify(results));
				clearInput();
				ns.display();
			}else{
				var html ='';
					html +='<p style="color:red;">Fill required Field(eg. Product Name, Price, Weight etc.)</p>';
				$('.productAdd-box').append(html);
			}
			
		}
		
	}

	function clearInput(){
		$('#stName').val('');
		$('#prPrice').val('');
		$('#prWeight').val('');
		$('#prDes').val('');
		$('#holdImg').attr('src','images/placeholder.png');
	}

	ns.clearProduct = function(){
		if(localStorage.length != 0){
			localStorage.clear();
			$("#productTable").find("tr:gt(0)").remove();
			ns.display();
		}
	}



})();