exports.config = {
    specs: ['../test/e2e/**/*.js'],
    onPrepare: function() {
        browser.driver.get('https://contatooh-edersondiassilva.c9.io:' + process.env.PORT);
        browser.driver.findElement(by.id('entrar')).click();
        browser.driver.findElement(by.id('login_field'))
            .sendKeys('edersondiassilva@gmail.com');
        browser.driver.findElement(by.id('password'))
            .sendKeys('github741');
        browser.driver.findElement(by.name('commit')).click();
    }
};