from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth

def login(request):
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '').strip()

        if not username or not password:
            messages.error(request, "Both fields are required.")
            return render(request, 'login.html')  # Avoid losing entered data
        
        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect("/")  # Redirect to home or dashboard
        else:
            messages.error(request, "Invalid username or password.")
            return render(request, 'login.html') 

    return render(request, 'login.html')


def register(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name', '').strip()
        last_name = request.POST.get('last_name', '').strip()
        username = request.POST.get('username', '').strip()
        email = request.POST.get('email', '').strip()
        password1 = request.POST.get('password1', '')
        password2 = request.POST.get('password2', '')

        if not all([first_name, last_name, username, email, password1, password2]):
            messages.error(request, "All fields are required.")
            return render(request, 'login.html', {'show_register': True})

        if password1 != password2:
            messages.error(request, "Passwords do not match.")
            return render(request, 'login.html', {'show_register': True})

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username is already taken.")
            return render(request, 'login.html', {'show_register': True})

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email is already registered.")
            return render(request, 'login.html', {'show_register': True})

        # Create user if everything is fine
        user = User.objects.create_user(username=username, password=password1, email=email, first_name=first_name, last_name=last_name)
        user.save()
        messages.success(request, "Registration successful! Please log in.")
        return redirect('login')  # Use the 'login' URL pattern

    return render(request, 'login.html', {'show_register': True})

def logout(request):
    auth.logout(request)
    return redirect('/')  # Redirect to home
