/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Edit Dialog Popver Component

// ### React
import React from 'react';
import PropTypes from 'prop-types';
import assign from 'lodash.assign';

import { POPOVER_EDIT_DIALOG } from '../../utilities/constants';

import Button from '../button';
import Popover from './popover';

const defaultProps = {
	labels: {
		cancel: 'Cancel',
		save: 'Save',
	},
};
class EditDialogPopover extends React.Component {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = POPOVER_EDIT_DIALOG;

	// ### Prop Types
	static propTypes = {
		/**
		 * By default, a unique ID will be created at render to support keyboard navigation, ARIA roles, and connect the popover to the triggering button. This ID will be applied to the triggering element. `${id}-popover`, `${id}-dialog-heading`, `${id}-dialog-body` are also created.
		 */
		id: PropTypes.string,
		/**
		 * Set to true when inputs within the popover are modified.
		 */
		isModified: PropTypes.bool,
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `cancel`: text for Cancel button
		 * * `save`: text for Save button
		 *
		 * _Tested with snapshot testing._
		 */
		labels: PropTypes.shape({
			cancel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			save: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		}),
		/**
		 * This function is passed onto the cancel `Button`. Triggered when the trigger button is clicked.
		 */
		onCancel: PropTypes.func,
		/**
		 * This function is passed onto the save `Button`. Triggered when the trigger button is clicked.
		 */
		onSave: PropTypes.func,
		/**
		 * Popover of type `~/components/popover`. This popover will be cloned and additional props appended, if passed in.
		 */
		popover: PropTypes.node,
	};

	render() {
		const { onCancel, onSave, ...restProps } = this.props;

		// trigger button will either be passed in children or defaults to an edit button.
		const children = this.children ? (
			this.children
		) : (
			<Button
				assistiveText={{ icon: 'Edit: Status' }}
				aria-controls={`${this.props.id}-edit-button`}
				className="slds-button_reset"
				iconCategory="utility"
				iconClassName="slds-button__icon slds-button__icon_hint"
				iconName="edit"
				onClick={this.props.handleOpen}
				variant="icon"
				style={{ verticalAlign: 'middle' }}
			/>
		);

		const labels = assign({}, defaultProps.labels, this.props.labels);

		return (
			<Popover
				classNameBody={[
					'slds-p-left_small',
					'slds-p-top_medium',
					'slds-p-right_small',
				]}
				classNameFooter={['slds-p-top_xx-small', 'slds-p-bottom_xx-small']}
				footer={
					<div className="slds-text-align_right slds-col_padded slds-text-align_right slds-p-bottom_x-small">
						<Button label={labels.cancel} onClick={onCancel} />
						<Button
							disabled={!this.props.isModified}
							variant="brand"
							label={labels.save}
							onClick={onSave}
						/>
					</div>
				}
				footerStyle={{ borderTop: '0px' }}
				{...restProps}
			>
				{children}
			</Popover>
		);
	}
}

EditDialogPopover.defaultProps = defaultProps;

export default EditDialogPopover;
