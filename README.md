# rest-app

## Migrations

    Initialize database access:
        dotnet tool install --global dotnet-ef
        dotnet ef database drop

    Create initial migration:
        dotnet ef migrations add InitialCreate

    Update database:
        dotnet ef database update

    Set secret Key:
        dotnet user-secrets init
        dotnet user-secrets set "RestAPP:JwtKey" "my_very_secret_key"
