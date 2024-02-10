// _____________________________________________defite all tables && reservation____________
const tables = [
    { 'persons': 1, 'free': 10 },
    { 'persons': 2, 'free': 6 },
    { 'persons': 4, 'free': 10 },
    { 'persons': 8, 'free': 5 },
    { 'persons': 12, 'free': 4 },
]
const guests = [
    { 'guest': 'As', 'need': 150 }
]
console.log(tables,guests);

// _____________________________________________free places counter_________________________
function freePlaces() {
    let i = tables.length - 1;
    let freePlacesSum = 0;
    while (i >= 0) {
        freePlacesSum += tables[i].persons * tables[i].free;
        i--;
    }
    return freePlacesSum;    
}

// _____________________________________________get HTML elements___________________________
let reserve_modal = document.getElementById('reserve_modal');
let confirm_modal = document.getElementById('confirm_modal');
let close_btn = document.getElementById('close_modal');
let confirm = document.getElementById('confirm');
let reserve = document.getElementById('reserve_modal_link');
let reserved = document.getElementById('reserved');
let free_tables = document.getElementById('free_tables');

// _____________________________________________get && reset input data______________________
function get_input_data () {
    let num = document.getElementById('inp_persons_number').value;
    let date = document.getElementById('inp_date').value;
    let name = document.getElementById('inp_name').value;
    let phone = document.getElementById('inp_phone').value;
    console.log(num, date, name, phone);    
    // set_guests()
    return [num, date, name, phone];
}
function set_guests() {
    inp_data = get_input_data();
    newGuest = {
        'guest': inp_data[2],
        'need': inp_data[0],
        'date': inp_data[1],
        'phone': inp_data[3],
    }
    guests.push(newGuest);
}
function reset_input_data() {
    document.getElementById('inp_persons_number').value = null;
    document.getElementById('inp_date').value = '';
    document.getElementById('inp_name').value = '';
    document.getElementById('inp_phone').value = '';
}

// _____________________________________________show tables_______________________________
function show_tables() {
    let tables_list = document.getElementById('tables_list');
    tables_list.innerHTML = '';
    let i = tables.length - 1;
    while (i >= 0) {
        if (tables[i].free == 0) {
            tables_list.innerHTML += `<li style="color: #bebebe">Sorry, we don't have free tables for ${tables[i].persons} people </li>`;
        } else {
            tables_list.innerHTML += `<li>Tables for ${tables[i].persons} people - ${tables[i].free} free</li>`;
        }        
        i--;
    }
}

// _____________________________________________open modal && get free tables________________
reserve.onclick = () => {
    reserve_modal.classList.add('active');
    // f = freePlaces();
    // console.log(tables);
    free_tables.innerHTML = freePlaces();
    // document.getElementById('inp_persons_number').value = '';
    reset_input_data();
    show_tables();
}

// _____________________________________________check inputs_________________________________
function check_inputs() {
    input_data = get_input_data();
    let check = true;   
    freePlacesSum = freePlaces();
    
    for (let i = 0; i < 4; i++) {
        if (input_data[i] === '') {
            document.getElementById(`err_${i}`).innerText = '*Please, enter data';
            check = false;
        } else {
            document.getElementById(`err_${i}`).innerText = '';           
        }
    } 
    if (input_data[0] > freePlacesSum) {
        document.getElementById(`err_${0}`).innerHTML = `*Please, enter a number less then ${freePlacesSum}`;
        check = false;
    }
    if (input_data[2].length <= 2 && input_data[2].length != 0) {
        document.getElementById(`err_${2}`).innerHTML = `*Please, enter more then 2 letters`;
        check = false;
    }
    if (input_data[3].length != 10) {
        document.getElementById(`err_${3}`).innerHTML = `*Please, enter 10 digits`;
        check = false;
    }
    console.log(check, freePlacesSum, input_data[3].length);
    return check;   
} 

// _____________________________________________open confirm modal___________________________
function open_confirm_modal() {
    confirm_modal.classList.add('active');
    input_data = get_input_data();
    confirm_message = document.getElementById('confirm_message');
    confirm_name = document.getElementById('confirm_name');

    confirm_name.innerHTML = `Dear ${input_data[2]}!`
    confirm_message.innerHTML = ` You reserve ${input_data[0]} seats, we'll be waiting for you at ${input_data[1]}`
}

// _____________________________________________reserve tables_______________________________
tableReservation = (peopleNeed) => {
    let i = tables.length - 1;
    // let peopleNeed = guests[0].need;
    let resPeopleSum = 0;
    while (i >= 0) {
        let t = tables[i].persons;
        let mod = peopleNeed - peopleNeed % t;
        let resTables = (mod / t > tables[i].free) ? tables[i].free : mod / t;

        peopleNeed -= resTables * t;
        resPeopleSum += resTables * t;
        tables[i].free = tables[i].free - resTables;
        // console.log(mod, '-', resTables, 'x', t, 'reserved,  need >>', peopleNeed,);
        i--;
    }
    // console.log(resPeopleSum);
}
// _____________________________________________reserved button_______________________________
reserved.onclick = () => {
    if (check_inputs())
   
    // set_guests();
    // console.log( guests);
    // console.log(input_data);
    // reserve_modal.classList.remove('active');
    // open_confirm_modal();
    check_inputs();
    if (check_inputs()) {
        input_data = get_input_data();
        tableReservation(input_data[0]);
        set_guests();
        open_confirm_modal();
        reserve_modal.classList.remove('active');
    }
    // alert(`${input_data[1]} you reserve ${input_data[0]} seats`);
    // reset_input_data();
};
// _____________________________________________confirm button________________________________
confirm.onclick = () => {
    confirm_modal.classList.remove('active');
    let freePl = freePlaces();
    let btn_reserve = document.querySelector('#reserve_modal_link');
    
    // console.log(freePl);
    // freePl === 0 ? btn_reserve.disabled = true : btn_reserve.disabled = false;
    // console.log(guests);
    if (freePl === 0) {
        btn_reserve.disabled = true;
        btn_reserve.innerHTML = 'NO FREE SEATS!';
        btn_reserve.style.color = 'red';
        btn_reserve.style.background = 'white';
    }
}
// _____________________________________________close modal_______________________________
reserve_modal.onclick = (e) => {
    e.target == reserve_modal ? reserve_modal.classList.remove('active') : '';
}
close_btn.onclick = () => reserve_modal.classList.remove('active');

