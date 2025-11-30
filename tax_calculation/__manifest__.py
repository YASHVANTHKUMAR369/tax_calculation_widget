{
    "name": "Tax Calculation",
    "version": "18.0",
    "sequence": 10,
    "description": "Tax Calculation Module",
    "category": "account",
    'author': 'Yash',
    'maintainer': 'Yash',
    'website': "https://www.linkedin.com/in/yashvanthkumar-d-3414b3229/",
    "depends": ["account"],
    "data": [
        "views/account_move.xml",
],
    'assets': {
        'web.assets_backend': [
            'tax_calculation/static/src/tax_calculation/*',
        ],
    },
    'images': ['static/description/cover.png'],
    "installable": True,
    "application": True,
    'license': 'OPL-1',
    'currency': 'USD',
    'price': '12.00',
}
