/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { CoreSetup } from 'src/core/public';
import { ManagementAppMountParams } from 'src/plugins/management/public/';
import { UsageCollectionSetup } from 'src/plugins/usage_collection/public';

import { ExtensionsService } from '../services';
import { IndexMgmtMetricsType } from '../types';
import { AppDependencies } from './app_context';
import { breadcrumbService } from './services/breadcrumbs';
import { documentationService } from './services/documentation';
import { HttpService, NotificationService, UiMetricService } from './services';

import { renderApp } from '.';

interface InternalServices {
  httpService: HttpService;
  notificationService: NotificationService;
  uiMetricService: UiMetricService<IndexMgmtMetricsType>;
  extensionsService: ExtensionsService;
}

export async function mountManagementSection(
  coreSetup: CoreSetup,
  usageCollection: UsageCollectionSetup,
  services: InternalServices,
  params: ManagementAppMountParams
) {
  const { element, setBreadcrumbs } = params;
  const [core] = await coreSetup.getStartServices();
  const { docLinks, fatalErrors } = core;

  breadcrumbService.setup(setBreadcrumbs);
  documentationService.setup(docLinks);

  const appDependencies: AppDependencies = {
    core: {
      fatalErrors,
    },
    plugins: {
      usageCollection,
    },
    services,
  };

  return renderApp(element, { core, dependencies: appDependencies });
}
