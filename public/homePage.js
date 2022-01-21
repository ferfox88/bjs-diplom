
//Выход из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) location.reload();
    })
}

//Получение информации о пользователе
ApiConnector.current(response => {
    if (response.success) ProfileWidget.showProfile(response.data);
})

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
function ratesUpdate() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data)
        }
    })
}
ratesUpdate();
setInterval(ratesUpdate, 60000);

//Операции с деньгами
const moneyManager = new MoneyManager();

//пополнение баланса
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Пополнение баланса выполнено успешно");
        } else moneyManager.setMessage(false, response.error);
    })
}

//конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Конвертирование валюты выполнено успешно");
        } else moneyManager.setMessage(false, response.error);
    })
}

//перевод валюты
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Перевод средств выполнен успешно");
        } else moneyManager.setMessage(false, response.error);
    })
}

//Работа с избранным
const favoritesWidget = new FavoritesWidget();

//начальный список избранного
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

//добавления пользователя в список избранных
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь добавлен в список избранных успешно");
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    })
}

//удаление пользователя из избранного 
favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь удален из списка избранных успешно");
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    })
}