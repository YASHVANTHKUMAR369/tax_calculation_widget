import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { useService } from "@web/core/utils/hooks";
import { Component, useState, onWillStart } from "@odoo/owl";


export class TaxCalculation extends Component {
    static template = "tax_calculation.TaxCalculation";
    static props = {
        ...standardFieldProps,
        tax_field: { type: String, optional: true },
        amount_field: { type: String, optional: true },
        display_name_field: { type: String, optional: true },
        view: { type: String, optional: true },
    };
    static defaultProps = {
        tax_field: "",
        amount_field: "",
        display_name_field: "",
        view: "all",
    };

    setup() {
        this.action = useService("action");
        this.orm = useService("orm");

        this.state = useState({
            record_values :null,
            currency_symbol :"",
            view :this.props.view,
        });

        // 🎨 Just before rendering
        onWillStart(async () => { // <-- Add 'async' here
            let tax_calculation_data = await this.orm.call(
                "account.move",
                "calculate_tax_values",
                [
                    this.props.record.resModel,
                    this.props.record.data.id,
                    this.props.name,
                    this.props.tax_field,
                    this.props.amount_field,
                    this.props.display_name_field
                ]
            );
            this.state.record_values = tax_calculation_data[0];
            this.state.currency_symbol = tax_calculation_data[1];
        });
    }
}

export const taxCalculation = {
    component: TaxCalculation,
    displayName: _t("Tax Calculation"),
    supportedOptions: [
        {
            label: _t("Tax Field"),
            name: "tax_field",
            type: "string",
        },
        {
            label: _t("Amount Field"),
            name: "amount_field",
            type: "string",
        },
        {
            label: _t("Display Name Field"),
            name: "display_name_field",
            type: "string",
        },
        {
            label: _t("View"),
            name: "view",
            type: "string",
        },
    ],
    extractProps: ({ options }) => ({
        tax_field: options.tax_field,
        amount_field: options.amount_field,
        display_name_field: options.display_name_field,
        view: options.view,
    }),
};

registry.category("fields").add("TaxCalculation", taxCalculation);
