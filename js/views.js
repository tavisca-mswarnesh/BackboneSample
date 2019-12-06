Todoview = Backbone.View.extend({
    className: "todorow",
    render: function() {
      const self=this;
      $.get('template/todo.html',function(data){
        const template=_.template(data);
        console.log(self.model);
        self.$el.html(template(self.model.toJSON()))
    });
      return self;
    },
    events: {
      "click .delete": "delete",
      "click .check": "check"
    },
    delete: function() {
      todolist.remove(this.model);
    },
    check: function(event) {
      const selected = $(event.target).is(":checked");
      const label = $(event.target).next();
      if (selected) {
        label.addClass("disable-label");
        this.model.set({ Isdone: true });
      } else {
        label.removeClass("disable-label");
        this.model.set({ Isdone: false });
      }
      console.log(selected);
    }
  });

  const TodolistView = Backbone.View.extend({
    tagName: "table",
    initialize() {
      this.model.on("change create remove", this.add, this);
    },
    add: function() {
      this.$el.empty();
      this.render();
    },
    render: function() {
      this.model.each(todo => {
        const todoView = new Todoview({ model: todo });
        this.$el.append(todoView.render().$el);
      });
      return this;
    }
  });

  const Input = Backbone.View.extend({
    className: "todorow",
    events: {
      "click .Add-Button": function() {
        if ($("#top-text-box").val() != "")
          todolist.create(
            new Todo({
              Task: $("#top-text-box").val(),
              Priority: $("#todo-priority").val()
            })
          );
        $("#top-text-box").val("");
        $("#top-text-box").focus();
      }
    },
  
    render: function() {
      const self = this;
      $.get("template/top.html",function(data){
          self.$el.html(_.template(data));
      });
      //this.$el.html('<h1>Hello</h1>');
  
      return this;
    }
  });