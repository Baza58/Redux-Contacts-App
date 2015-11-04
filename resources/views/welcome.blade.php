<!DOCTYPE html>
<html>
    <head>
        <title>Contacts App</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">
    </head>
    <body>
        <header>
            <nav class="navbar navbar-default">
            <div class="container-fluid">
    
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/">Contacts App</a>
    </div>

    
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
       
      </ul>
      
      <ul class="nav navbar-nav navbar-right">
        @if(Auth::check()) 
            <li><a href="/auth/logout">Logout</a></li>
        @else
            <li><a href="/auth/login">Login</a></li>
            <li><a href="/auth/register">Register</a></li>
        @endif 
        

      </ul>
    </div>
  </div>
</nav>
        </header>
        <div class="container">
            <div class="jumbotron">
                <h1>Contacts App</h1>
                    <p>Manage your contacts with this app!</p>
                    <p>
                        @if (Auth::check())
                            <a class="btn btn-primary btn-lg" href="/home" role="button">Let's see!</a>    
                        @else
                            <a class="btn btn-primary btn-lg" href="/auth/register" role="button">Register</a>
                            <a class="btn btn-default btn-lg" href="/auth/login" role="button">Login</a>
                        @endif
                    </p>
            </div>
        </div>
    </body>
</html>
