    /* a simple bootstrap with JayData Item Store API */
    $data.define("Cart", {
        ProductName: String,
        Amount: Number
    });    
            
    viewModel = kendo.observable({
       items: [],
       dbBooting: true,
       dbOK: false,
       dbError: false,
       displayCart: function() {
            $data("Cart")
               .readAll()
               .then(function(items) {
                    viewModel.set("items", items.map(function(item) {
                        return item.asKendoObservable();
                    }));
                });
       },
       removeItem: function(e) {
            e.item.css("color","silver");
            e.dataItem.remove().then(viewModel.displayCart);
       },
       addItem: function() {
            return $data("Cart")
                        .save({
                            ProductName: "Product#" + Math.random().toString()[6], 
                            Amount: Math.random().toString()[5] 
                        })
                        .then(viewModel.displayCart);
       },
       initDatabase: function() { 
           //database is created the first time an item is inserted
            viewModel.addItem()
                     .then(function() {
                        viewModel.set("dbBooting", false);
                        viewModel.set("dbOK", true);
                     })
                    .fail(function() {
                        viewModel.set("dbBooting", false);
                        viewModel.set("dbError", true);
        
                    });
               
       }
    });


  $(function() {
     new kendo.mobile.Application(document.body); 
  });