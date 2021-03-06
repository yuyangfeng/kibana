/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import {
  setBasePath,
  toggleIntegrationsPopover,
  triggerAppRefresh,
  setAlertFlyoutVisible,
} from '../../actions';
import { uiReducer } from '../ui';
import { Action } from 'redux-actions';

describe('ui reducer', () => {
  it(`sets the application's base path`, () => {
    const action = setBasePath('yyz') as Action<never>;
    expect(
      uiReducer(
        {
          alertFlyoutVisible: false,
          basePath: 'abc',
          esKuery: '',
          integrationsPopoverOpen: null,
          lastRefresh: 125,
        },
        action
      )
    ).toMatchSnapshot();
  });

  it('adds integration popover status to state', () => {
    const action = toggleIntegrationsPopover({
      id: 'popover-2',
      open: true,
    }) as Action<never>;
    expect(
      uiReducer(
        {
          alertFlyoutVisible: false,
          basePath: '',
          esKuery: '',
          integrationsPopoverOpen: null,
          lastRefresh: 125,
        },
        action
      )
    ).toMatchSnapshot();
  });

  it('updates the refresh value', () => {
    const action = triggerAppRefresh(125) as Action<never>;
    expect(
      uiReducer(
        {
          alertFlyoutVisible: false,
          basePath: 'abc',
          esKuery: '',
          integrationsPopoverOpen: null,
          lastRefresh: 125,
        },
        action
      )
    ).toMatchSnapshot();
  });

  it('updates the alert flyout value', () => {
    const action = setAlertFlyoutVisible(true) as Action<never>;
    expect(
      uiReducer(
        {
          alertFlyoutVisible: false,
          basePath: '',
          esKuery: '',
          integrationsPopoverOpen: null,
          lastRefresh: 125,
        },
        action
      )
    ).toMatchInlineSnapshot(`
      Object {
        "alertFlyoutVisible": true,
        "basePath": "",
        "esKuery": "",
        "integrationsPopoverOpen": null,
        "lastRefresh": 125,
      }
    `);
  });
});
