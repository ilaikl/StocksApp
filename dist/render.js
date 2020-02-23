class Renderer {
    constructor() {
    }

    renderOptions(){
        
    }

    renderMainManue(){
        
        $("#mainMenu").empty()
        let template = Handlebars.compile($('#main-menu-template').html())
        $('#mainMenu').append(template())
    }

    renderUserList(users) {
        $("#userList").empty()
        for (let user of users) {
            
            let userListBox = $("<div class='userListBox'><p class='userListName'>" + user.name +"</p> <p class='cityListTemp'>" +city.temperature+ "°C</p><p class='cityListCondition'>" +city.condition+ "</p></div>")
 
            $("#userList").append(userListBox)
        }
    }

    renderUser(user) {
        
        $("#userData").empty()
        
            let userBox = $("<div class='selectedUser'><p class='userName'>" + user.name +"</p> <div class='cityTemp'><img src='http://openweathermap.org/img/wn/"+city.conditionPic+"@2x.png'>" +city.temperature+ "<span class='celsius'>°C </span></div> </div>")

        $("#userData").append(userBox)
    }

    renderStocksList(stocks) {
        $("#stockList").empty()
        for (let stock of stocks) {
            
            let stockListBox = $("")// <p class='cityListTemp'>" +city.temperature+ "°C</p><p class='cityListCondition'>" +city.condition+ "</p></div>")
 
            $("#stockList").append(stockListBox)
        }
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