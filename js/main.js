const todolist = new TodoList();
todolist.fetch({
  success: function(collection, response, options) {
    const todolistview = new TodolistView({ el: "#todo", model: todolist });
    todolistview.render();
  }
});

const input = new Input();
$("#top").html(input.render().$el);
