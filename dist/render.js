class Renderer {
    constructor() {
    }

    renderOptions(){
        
    }

    renderMainManue(){
        
        $("#currentData").empty()
        let template = Handlebars.compile($('#main-menu-template').html())
        $('#currentData').append(template())
    }

    renderUserList(users) {
    }

    renderUser(user) {
        
        $("#userData").empty()
        
            let userBox = $("<div class='selectedUser'><p class='userName'>" + user.name +"</p> <div class='cityTemp'><img src='http://openweathermap.org/img/wn/"+city.conditionPic+"@2x.png'>" +city.temperature+ "<span class='celsius'>°C </span></div> </div>")

        $("#userData").append(userBox)
    }

    renderStocksList(stocks) {
        
        $("#dataList").empty()
        let template = Handlebars.compile($('#stock-list-template').html())
        const newHTML = template({ stock:stocks.data});
       $("#dataList").append(newHTML)

       console.log({stock:stocks.data});
       
        
    }

    renderStock(stock) {
        
        $("#stockData").empty()
        
            let stockBox = $("<div class='selectedStock'><p class='stockName'>" + stock.name +"</p></div>")// <div class='cityTemp'><img src='http://openweathermap.org/img/wn/"+city.conditionPic+"@2x.png'>" +city.temperature+ "<span class='celsius'>°C </span></div> 

        $("#stockData").append(stockBox)
    }

    renderRecommendationList(recommendations) {
        $("#recommendationList").empty()
        for (let recommendation of recommendations) {
            
            let recommendationListBox = $("<div class='recommendationListBox'><p class='recommendationListName'>" + recommendation.name +"</p></div>")// <p class='cityListTemp'>" +city.temperature+ "°C</p><p class='cityListCondition'>" +city.condition+ "</p></div>")
 
            $("#recommendationList").append(recommendationListBox)
        }
    }

    renderRecommendation(recommendation) {
        
        $("#recommendationData").empty()
        
            let recommendationBox = $("<div class='selectedRecommendation'><p class='recommendationName'>" + recommendation.name +"</p></div>")// <div class='cityTemp'><img src='http://openweathermap.org/img/wn/"+city.conditionPic+"@2x.png'>" +city.temperature+ "<span class='celsius'>°C </span></div> 

        $("#recommendationData").append(recommendationBox)
    }

}