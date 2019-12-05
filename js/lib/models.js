const Todo = Backbone.Model.extend({
    // urlRoot: './api/todolist.json',
  
    defaults: {
      Isdone: false,
      Task: "testing",
      Priority: "low",
      deletebutton: "<i class='fa fa-trash-o delete'></i>"
    }
  });
  