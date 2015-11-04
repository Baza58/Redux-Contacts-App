@extends('default')


@section('content')
</form>

    <h1>Login</h1>

    <form method="POST" action="/auth/login" >
    {!! csrf_field() !!}

    

    <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
        <label for="email" class="control-label">Email</label>
        <input type="email" name="email" value="{{ old('email') }}" id="email" class="form-control" >
        @if($errors->has('email'))
            @foreach($errors->get('email') as $error)
                <p class="control-label">{{ $error }}</p>
            @endforeach
        @endif
    </div>

    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
        <label for="password" class="control-label">Password</label>
        <input type="password" name="password" id="password" class="form-control" >
        @if($errors->has('password'))
            @foreach($errors->get('password') as $error)
                <p class="control-label">{{ $error }}</p>
            @endforeach
        @endif
    </div>

    <div class="form-group">
        <input type="checkbox" name="remember" > Remember me
    </div>

    

    <div>
        <button type="submit" class="btn btn-primary">Login</button>
        or
        <a href="/auth/register" class="btn btn-default">Register</a>
    </div>
</form>

@endsection