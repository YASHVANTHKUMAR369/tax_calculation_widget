from odoo import api, fields, models, _
from odoo.exceptions import UserError


class AccountMoveInherit(models.Model):
    _inherit = "account.move"


    @api.model
    def calculate_tax_values(self,res_model, res_id, field_values, tax_field, amount_field, display_name_field):
        main_record = self.env[res_model].browse(res_id)
        one2many_field = getattr(main_record, field_values)
        output = dict()
        for line in one2many_field:
            tax_field_record = getattr(line, tax_field)
            tax_details_data = tax_field_record._get_tax_details(price_unit=getattr(line, amount_field), quantity=1,)
            for data in tax_details_data['taxes_data']:
                data['tax_name'] =  data['tax'].name
                data['group_name'] =  data['group'].name
                data['group_name'] =  data['group'].name
                data['currency_symbol'] =  self.env.company.currency_id.symbol
            output.update({getattr(line, display_name_field).display_name: tax_details_data})
        return output, self.env.company.currency_id.symbol

