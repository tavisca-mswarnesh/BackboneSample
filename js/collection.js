const TodoList = Backbone.Collection.extend({
    url: "./api/todolist.json",
    model: Todo,
    parse: function(data) {
      return data.todolist;
    }
  });