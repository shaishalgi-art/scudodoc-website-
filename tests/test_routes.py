import pytest
from app import app as flask_app


@pytest.fixture
def client():
    flask_app.config['TESTING'] = True
    with flask_app.test_client() as client:
        yield client


def test_homepage_returns_200(client):
    r = client.get('/')
    assert r.status_code == 200


def test_technology_returns_200(client):
    r = client.get('/technology')
    assert r.status_code == 200


def test_esg_returns_200(client):
    r = client.get('/esg')
    assert r.status_code == 200


def test_market_returns_200(client):
    r = client.get('/market')
    assert r.status_code == 200


def test_contact_returns_200(client):
    r = client.get('/contact')
    assert r.status_code == 200


def test_404_on_unknown_route(client):
    r = client.get('/nonexistent')
    assert r.status_code == 404
