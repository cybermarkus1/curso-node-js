var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var cookieSession  = require('cookie-session');
var favicon        = require('static-favicon');
var Jade           = require('jade');
var app            = express();

app.use(favicon());
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser("secreto"));
app.use(cookieSession({secret: "asdf"}));
app.engine("jade", Jade.__express);
app.set("views", "./views");
app.set("view engine", "jade");
app.use(express.static(__dirname + "/public"));

function extend() {
  var args = [].slice.call(arguments);
  return args.reduce(function(acc, el) {
    for (var k in el) { acc[k] = el[k]; }
    return acc;
  });
}

/* Models */

var Post = function(data) {
  data = extend({}, {title: "", content: "", date: Date.now(), views: 0}, data);
  extend(this, data);
}
extend(Post, {
  _posts: [],
  _id: 0,
  find: function(id) {
    return this._posts.filter(function(p) { return p.id == id })[0];
  },
  getAll: function() {
    return this._posts;
  }
});
extend(Post.prototype, {
  save: function() {
    this.id = Post._id++;
    Post._posts.push(this);
  },
  update: function() {
    var posts = Post._posts;
    for (var i=0,_len=posts.length; i<_len; i++) if (posts[i].id === this.id) {
      posts.splice(i, 1, this);
      break;
    }
  },
  delete: function() {
    var posts = Post._posts;
    for (var i=0,_len=posts.length; i<_len; i++) if (posts[i].id === this.id) {
      posts.splice(i, 1);
      break;
    }
  }
});

app.get("/", function(req, res) {
  res.render("post-list", {posts: Post.getAll()});
});

app.get("/posts", function(req, res) {
  res.render("post-list", {posts: Post.getAll()});
});

app.get("/posts/new", function(req, res) {
  res.render("new-post", {post: {}});
});

app.get("/posts/:id", function(req, res) {
  var post = Post.find(req.params.id);
  res.render("post-detail", {post: post});
});

app.get("/posts/:id/edit", function(req, res) {
  var post = Post.find(req.params.id);
  res.render("new-post", {post: post});
});

app.put("/posts/:id", function(req, res) {
  var post = Post.find(req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  post.update();
  res.render("post-detail", {post: post});
});

app.post("/posts", function(req, res) {
  var post = new Post({title: req.body.title, content: req.body.content});
  post.save();
  res.render("post-detail", {post: post});
});

app.delete("/posts/:id", function(req, res) {
  var post = Post.find(req.params.id);
  post.delete();
  res.redirect("/");
});

// colocar aqui el manejador de errores/middleware


/* Tu código aquí! */


app.listen(3000);
