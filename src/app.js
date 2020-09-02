/**
 * Sendet eine Meldung vom Betriebssystem an den Nutzer.
 * @param {*} title 
 * @param {*} body 
 * @param {*} iconPath 
 */
window.sendNotification = function(title = "Notification Header", body = "", iconPath = "./images/Bobby.jpg")
{
    const myNotification = new Notification(title, {
        body: body,
        icon: iconPath
    });

    return myNotification;
}