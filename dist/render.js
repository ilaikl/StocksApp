class Renderer {
    constructor() {
    }

    // renderOptions() {

    // }

    renderMainMenu() {

        $("#currentData").empty()
        let template = Handlebars.compile($('#main-menu-template').html())
        $('#currentData').append(template())
    }

    // renderUserList(users) {
    // }

    renderUser(user) {
        $("#currentData").empty()
        let template = Handlebars.compile($('#user-data-template').html())
        const newHTML = template(user);
        $("#currentData").append(newHTML)
    }

    renderStocksList(stocks) {
        
        $("#dataList").empty()
        let template = Handlebars.compile($('#stock-list-template').html())
        const newHTML = template({ stock: stocks.data });
        $("#dataList").append(newHTML)



    }

    renderStock(stock) {

        $("#currentData").empty()
        let template = Handlebars.compile($('#stock-data-template').html())
        const newHTML = template(stock)
        $("#currentData").append(newHTML)
    }

    renderRecommendationList(recommendations) {
        // recommendations.user=user


        $("#dataList").empty()
        let template = Handlebars.compile($('#recommendation-list-template').html())
        let newRec = { recommendation: [...recommendations] }
        console.log(newRec);

        const newHTML = template(newRec);
        $("#dataList").append(newHTML)
        

    }

    renderRecPageBottom(){
        $("#dataList").empty()
        let template = Handlebars.compile($('#rec-page-bottom-template').html())
        $("#dataList").append(template())
    }
    renderRecommendation(recommendation) {

        $("#currentData").empty()

        let template = Handlebars.compile($('#rec-data-template').html())
        const newHTML = template(recommendation)
        $("#currentData").append(newHTML)
    }

}