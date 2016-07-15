describe('Crapstore security tests: ', function() {
    it("should say there are 4 (non hidden) products in our store.", function() {
        browser.ignoreSynchronization = true;
        browser.get("http://localhost:1337/products");

        var products = element.all(by.css(".row.product"));

        expect(products.count()).toEqual(4)
    });

    it("should test for XSS vulnerability when creating a new entry", function() {
        browser.ignoreSynchronization = true;
        browser.get("http://localhost:1337/guestbook");

        var form    = element(by.css("#guestbook-form"));
        var name    = form.element(by.css('input[name="name"]'));
        var email   = form.element(by.css('input[name="email"]'));
        var message = form.element(by.css('textarea[name="message"]'));

        name.sendKeys("Test User");
        email.sendKeys("test@test.com");
        message.sendKeys('hello, I am a test user.<script>$(".navbar-brand").html("GoodStore")</script>');

        form.submit();

        var logo = element.all(by.css(".navbar-brand")).get(0).getText().then( function(new_text){
            expect(new_text).toBe("GoodStore");
        });
    });

    it("should test for SQL Injection to find the secret products", function() {
        browser.ignoreSynchronization = true;
        browser.get("http://localhost:1337/products");

        var form        = element(by.css(".product-search-form"));
        var search      = form.element(by.css('.search-term'));

        search.sendKeys("' OR true OR '");
        form.submit();

        var products = element.all(by.css(".row.product"));
        expect(products.count()).toEqual(6);
    });


    it("should test that your final payment depends on the cookie", function() {
        browser.ignoreSynchronization = true;
        browser.get("http://127.0.0.1:1337/login");

        // Retrieve the login form
        var form        = element(by.css("#login-form"));
        var email       = form.element(by.css('input[name="email"]'));
        var password    = form.element(by.css('input[name="password"]'));

        // Populate
        email.sendKeys("nielsdebruin@gmail.com");
        password.sendKeys("123");

        // Login
        form.submit();

        // Go to the products pages
        browser.get("http://127.0.0.1:1337/products");

        // List of add to cart btns
        var addToCart = element.all(by.css(".addToCartBtn"));

        // Add the first two products to our cart
        addToCart.get(0).click();
        addToCart.get(1).click();


        var newPrice = '0.42';
        // Change cart total to 42 cent
        browser.manage().addCookie('cartTotal', newPrice, '/', '127.0.0.1');

        // Make sure it has been changed
        browser.manage().getCookie('cartTotal').then(function(cookie) {
            expect(cookie.value).toEqual('0.42');
        });

        browser.get('http://127.0.0.1:1337/payment');

        var subtotal        = element(by.css('#subtotal')).getText();

        // See if subtotal has changed - subtotal should equal shipping(2*newPrice) + newPrice;
        expect(subtotal).toEqual('$ '+newPrice*3);
    });
});