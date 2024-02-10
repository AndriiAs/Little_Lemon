// const tables = [
//     { 'persons': 1, 'free': 10 },
//     { 'persons': 2, 'free': 6 },
//     { 'persons': 4, 'free': 10 },
//     { 'persons': 8, 'free': 0 },
//     { 'persons': 12, 'free': 1 },
// ]
// const reserve = [
//     { 'guest': 'As', 'need': 11 }
// ]
// console.log(tables);

// freePlaces = function () {
//     let i = tables.length - 1;
//     let freePlacesSum = 0;
//     while (i >= 0) {
//         freePlacesSum += tables[i].persons * tables[i].free;
//         i--;
//     }
//     return freePlacesSum;
//     // console.log(freePlacesSum);
// }

// f = freePlaces();
// console.log(f);

// tableReservation = () => {
//     let i = tables.length - 1;
//     let peopleNeed = reserve[0].need;
//     let resPeopleSum = 0;
//     while (i >= 0) {
//         let t = tables[i].persons;
//         let mod = peopleNeed - peopleNeed % t;
//         let resTables = (mod / t > tables[i].free) ? tables[i].free : mod / t;
//         peopleNeed -= resTables * t;

//         resPeopleSum += resTables * t;
//         tables[i].free = tables[i].free - resTables;
//         console.log(mod, '-', resTables, 'x', t, 'reserved,  need >>', peopleNeed,);
//         i--;
//     }
//     console.log(resPeopleSum);
// }
// tableReservation();
// console.log(tables)
