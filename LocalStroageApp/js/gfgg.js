/// <reference path="js/jquery-3.2.1.min.js" />
$(document).ready(function () {

	productNamespace.initialize();
	
	$('#prImage').on('change', function(e){
		var file = e.originalEvent.target.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(evt){
			$('#holdImg').removeAttr('src');
			$('#holdImg').attr('src', evt.target.result);
		};
		
	});
});

(function(){
	this.productNamespace = this.productNamespace || {};
	var ns = this.productNamespace;
	var currentProduct;
	
	ns.initialize = function(){
		$('#addBtn').on('click',ns.save);
		if(localStorage.length == 0){
			$('#clearBtn').attr('disabled','disabled');
		}
		$('#clearBtn').on('click', function(e){
			e.preventDefault();
			clearAllProduct();
		});
		ns.displayProduct();
	}
	
	function retrieveData(){
		var getProduct = localStorage.getItem('products');
		return getProduct ? JSON.parse(getProduct):[];
	}
	
	ns.displayProduct = function(){
		currentProduct ={key:null, product:{}};
		var results = retrieveData();
		bindToGrid(results);
	}
	
	function bindToGrid(result){
		var html='';
		for(var i = 0; i < result.length;i++){
			var product = result[i];
			html +='<tr><td class="displayImg"><img class="img-responsive" src="'+product.prImage+'"/></td>';
			html +='<td>'+product.prName+'</td>';
			html +='<td>'+product.prPrice+'</td>';
			html +='<td>'+product.prWeight+'</td>';
			html +='<td>'+product.prDes+'</td>';
			html +='<td><a class="edit" href="javascript:void(0)" data-key="'+i+'"><i class="fa fa-edit"></i></a></td></tr>';
		}
		html = html || '<tr><td colspan="6">No records available</td></tr>';
		$('#productTable').append(html);
		$('#productTable a.edit').on('click', ns.loadProduct);
	}

	ns.loadProduct = function(){
		var key = parseInt($(this).attr('data-key'));
		var results = retrieveData();
		$('#headStatus').html('Edit Product');
		$('#addBtn').html('Update Product');
		currentProduct = {key: key, product:results[key]};
		displayCurrentProduct();
	}

	function displayCurrentProduct(){
		var product = currentProduct.product;
		$('#prName').val(product.prName);
		$('#prPrice').val(product.prPrice);
		$('#prWeight').val(product.prWeight);
		$('#prDes').val(product.prDes);
		$('#holdImg').attr('src', product.prImage);
	}

	ns.save = function(){
		var img = new Image();
		var product = currentProduct.product;
		product.prName = $('#prName').val();
		product.prPrice = $('#prPrice').val();
		product.prWeight = $('#prWeight').val();
		product.prDes = $('#prDes').val();
   		img.src = $('#holdImg').attr('src');
		product.prImage = img.src;

		var results = retrieveData();

		

		if (currentRecord.key != null) {
		    results[currentRecord.key] = product;
		}
		else {
		    results.push(product);
		}


		localStorage.setItem('products', JSON.stringify(results));
		ns.displayProduct();
	}

	function clearAllProduct(){
		if(localStorage.length != 0){
			localStorage.clear();
		}else{
			$('#clearBtn').attr('disabled','disabled');
		}
	}

	
	
	
})();
