const Todo = Backbone.Model.extend({
    // urlRoot: './api/todolist.json',
  
    defaults: {
      Isdone: false,
      Task: "testing",
      Priority: "low",
    }
  });
  