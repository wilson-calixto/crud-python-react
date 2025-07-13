# Django Clean Architecture - Produtos API
Veja **API_DOC.md** para exemplos de uso via cURL e leia `requirements.txt` para dependências.


 
# Crie e ative o ambiente virtual
python -m venv venv
source venv/bin/activate         # Linux/macOS
venv\\Scripts\\activate          # Windows


# Instale dependências
pip install -r requirements.txt


python manage.py makemigrations
python manage.py migrate


python manage.py createsuperuser

python manage.py runserver

# PRA RODAR
API\venv\\Scripts\\activate

python API/manage.py runserver
