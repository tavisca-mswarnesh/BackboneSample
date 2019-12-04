function getTask(Isdone,task){
    if(Isdone)
        return "<input type='checkbox' class='check' checked><span class='disable-label'> "+ task +"  </span>";
    return "<input type='checkbox' class='check'><span>"+task+"</span>";
}

const Todo= Backbone.Model.extend(
    {
        // urlRoot: './api/todolist.json',
        
        defaults:{
            "Isdone" :false,
            "Task" : "testing",
            "Priority" : "low",
            "deletebutton": "<i class='fa fa-trash-o delete'></i>"
            
        }
    }
);
function gettoDocoloumDiv(modelValue){
    return "<div class='todocoloum'> "+modelValue+"</div>"
   }
Todoview=Backbone.View.extend(
    {
        
        className:'todorow',
        render:function(){
            // this.$el.html("<td class='td'>"+this.model.get('checkbox')+"</td><td class='td'>"+this.model.get('Task')+"</td><td class='td'>"+this.model.get('Isdone')+"</td><td>"+this.model.get('Priority')+    "</td><td class='td'>"+this.model.get('deletebutton')+"</td>");
            //this.$el.html("<div class='todocoloum'> "+ getcheckbox(this.model.get('Isdone')) +"<span> "+ this.model.get('Task') +"  </span> </div>" + "<div class='todocoloum'> "+ this.model.get('Isdone') +"  </div>"+"<div class='todocoloum'> "+ this.model.get('Priority') +"  </div>" + "<div class='todocoloum'> "+ this.model.get('deletebutton') +"  </div>");
            this.$el.html(gettoDocoloumDiv(getTask(this.model.get('Isdone'),this.model.get('Task'))) + gettoDocoloumDiv( this.model.get('Isdone')) +gettoDocoloumDiv( this.model.get('Priority')) + gettoDocoloumDiv(this.model.get('deletebutton') ));
            return this;
        },
        events:{
            "click .delete":"delete",
             "click .check":"check"
        },
        delete:function()
        {
            todolist.remove(this.model);
        },
        check:function(event){
            const selected=$(event.target).is(':checked');
            const label=$(event.target).next();
            if(selected)
                {label.addClass('disable-label');
                this.model.set({Isdone:true});
                
            }
            else{
                label.removeClass('disable-label');
                this.model.set({Isdone:false});
            }
            console.log(selected);
        }
        
    }
);
const TodoList=Backbone.Collection.extend(
    {
        url:'./api/todolist.json',
        model:Todo,
        parse: function (data) {
            return (data.todolist);
          }

        
        }



    
)
const TodolistView=Backbone.View.extend(
    {
        tagName:'table',
        initialize(){
            this.model.on('change create remove',this.add,this)
        },
        add:function(){
            this.$el.empty();
            this.render();
        },
        render:function(){
            this.model.each(todo => {
                const todoView = new Todoview({ model: todo });
                this.$el.append(todoView.render().$el);
            });
            return this;
        }
    }
);
//todolist=new TodoList([new Todo({"Isdone":true,"Task":"writing sample json file ","priority":"high"}),new Todo({"Isdone":false,"Task":"make necessary models","priority":"high"}),new Todo({"Isdone":false,"Task":"make a collection ","priority":"high"})]);
const todolist=new TodoList(); 
var finallist;
todolist.fetch({
    success: function (collection, response, options) {
        
        
    }
});
const Input=Backbone.View.extend({
    className:'todorow',
    events: {
        'click .Add-Button': function(){
            if($('#top-text-box').val()!='')
            todolist.create(new Todo({Task:$('#top-text-box').val(),Priority:$('#todo-priority').val()}))
            $("#top-text-box").val('');
            $("#top-text-box").focus();
            
            
        }
    },
    
    render: function() {
        this.$el.html('<input type="text" id="top-text-box" class="SDkEP"><select id="todo-priority" class="todo-priority"><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select><button class="Add-Button" >save</button>');
        return this;
    }
});
const input=new Input();
$('#top').html(input.render().$el);
const todolistview=new TodolistView({ el: '#todo' , model: todolist})

todolistview.render();



