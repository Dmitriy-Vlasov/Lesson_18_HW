'use strict'

const $todoListItemTamplate = $('#todoListItemTemplate').html();

$('#todoListForm').submit(onTodoListFormSubmit);
$('.todoList').click('.deleteButton', ontodoListClick);

let todoListData = [];

init();

function init() {
    getData();
    renderTodoList();
}            

function onTodoListFormSubmit(e) {
    e.preventDefault();
    if ($('.todoListInput').val().trim() !== '') {
        creatNewItemData();
        setData();
        renderTodoList();
        clearInput();
    } 
}

function ontodoListClick(e) {
    const $el = $(e.target);
    if($el.hasClass('deleteButton')) {
        deleteDataItem($el);
        setData();
        deleteItem($el);
    } else if ($el.hasClass('todoListItem')) {
        addClassDone($el);
        editDataItem($el);
        setData();
    }
}

function getData() {
    let data = localStorage.getItem('todoListData');
    return todoListData = data ? JSON.parse(data) : [];
}

function addClassDone(el) {
    el.toggleClass('done');
}

function editDataItem(el) {
    const data = todoListData.find(item => item.id == el.data('id'));
    el.hasClass('done') ? data.status = true : data.status = false;
}

function deleteDataItem(el) {
    todoListData = jQuery.grep(todoListData, dataItem => 
        dataItem.id != el.parent().data('id'));
}

function deleteItem(el) {
    el.parent().remove();
}

function creatNewItemData() {
    let todoListDataItem = {};
    todoListDataItem.id = Date.now();
    todoListDataItem.content = $('.todoListInput').val();
    todoListDataItem.status = false;
    todoListData.push(todoListDataItem);
}

function setData() {
    localStorage.setItem('todoListData', JSON.stringify(todoListData));
}

function renderTodoList() {
    let a = todoListData.map(todoListItemtoHTML).join('\n');
    $('#todoList').html(a);
}

function todoListItemtoHTML(dataItem) {
    return $todoListItemTamplate   
        .replace('{{id}}', dataItem.id)
        .replace('{{todoListItemclass}}', 'todoListItem')
        .replace('{{content}}', dataItem.content)
        .replace('{{isDoneClass}}', dataItem.status ? 'done' : '')
    }

function clearInput() {
    $('.todoListInput').val('');
}