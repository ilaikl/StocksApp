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

        $("#userData").empty()
        let template = Handlebars.compile($('#user-data-template').html())
        const newHTML = template(user);
        $("#userData").append(newHTML)
    }

    renderStocksList(stocks) {

        $("#stockList").empty()
        let template = Handlebars.compile($('#stock-list-template').html())
        const newHTML = template({ stock: stocks.data });
        $("#stockList").append(newHTML)

        console.log({ stock: stocks.data });


    }

    renderStock(stock) {

        $("#currentData").empty()
        let template = Handlebars.compile($('#stock-data-template').html())
        const newHTML = template(stock)
        $("#currentData").append(newHTML)
    }

    renderRecommendationList(recommendations) {
        $("#recommendationList").empty()
        let template = Handlebars.compile($('#rec-list-template').html())
        const newHTML = template({ recommendations: recommendations.data });
        $("#recommendationList").append(newHTML)

    }

    renderRecommendation(recommendation) {

        $("#recommendationData").empty()

        let template = Handlebars.compile($('#rec-data-template').html())
        const newHTML = template(recommendation)
        $("#recommendationData").append(newHTML)
    }

}