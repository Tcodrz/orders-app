


generateOrderId();
generateOrderId();
generateOrderId();
generateDate();
generateDate();
generateDate();

const a1 = generateAdvertiser();
const a2 = generateAdvertiser();
const a3 = generateAdvertiser();

console.log(a1);
console.log(a2);
console.log(a3);


/**
 * Returns a string in this format S##-#####
 * the first two numbers represents the year
 * the second pair of number represents the month
 * the last three numbers represents the order number
 */
function generateOrderId() {
    const date = new Date();
    const year = date.getFullYear().toString().split('')[2] + date.getFullYear().toString().split('')[3];
    let month = Math.round(Math.random() * 12);
    month = month < 10 ? '0' + month : month.toString();
    let orderNumber = Math.round(Math.random() * 100);
    if (orderNumber < 10) {
        orderNumber = '00' + orderNumber;
    } else if (orderNumber < 100 && orderNumber > 9) {
        orderNumber = '0' + orderNumber;
    }

    const orderId = `S${year}-${month}${orderNumber}`;
    console.log(orderId);
    return orderId;
}

function generateDate() {
    const year = '2021';
    let month = Math.round(Math.random() * 12);
    month = month < 10 ? '0' + month : month.toString();
    let day = Math.round(Math.random() * 31);
    day = day < 10 ? '0' + day : day.toString();
    const date = `${month}/${day}/${year}`;
    console.log(date);
    return date;
}

function generateAdvertiser() {
    const names = ['לפמ', 'מנצ', 'פלאפון', 'יהושע', 'אברהם', 'תפארת הפקות', 'מקאן', 'ליד', 'שפא'];
    const id = Math.round(Math.random() * 15);
    const name = names[Math.round(Math.random() * names.length - 1)];
    contacts = [];

    return {
        id,
        name,
        contacts
    }
}

function generateContact() {

}

function generateCustomer() {

}

function generateCampaign() {

}

function generateType() {

}

function generateStatus() {

}

function generateInvoiceNumber() {

}

function generatePrice() {
    const price = {
        fullPrice: 0,
        discount: 0,
        collection: [{
            id: 0,
            name: '',
            price: 0
        }]
    }
}
function generateGeneralNotes() {

}

function generateBookkeepingNotes() {

}

function generateNarrator() {

}

function generateNumberOfVersions() {

}

function generateNumberOfVariations() {

}
function generateResponsibility() {
    const responsibility = {
        narrator: 'באחריות אולפן ההקלטות',
        text: 'באחריות הלקוח',
        music: 'ללא'
    }
}

function generateUsagePeriod() {
    const options = ['ללא', 'שתי עונות', 'עונה'];
}

function generateMusic() {

}

function generateStudioServicesIncluded() {

}