/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React from 'react';
import { FormattedMessage } from '@kbn/i18n/react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
  EuiButtonEmpty,
  EuiSpacer,
} from '@elastic/eui';
import { WithHeaderLayout } from '../../../../layouts';
import { AgentConfig, PackageInfo } from '../../../../types';
import { PackageIcon } from '../../../../components/package_icon';
import { CreateDatasourceFrom, CreateDatasourceStep } from '../types';

export const CreateDatasourcePageLayout: React.FunctionComponent<{
  from: CreateDatasourceFrom;
  basePath: string;
  cancelUrl: string;
  maxStep: CreateDatasourceStep | '';
  agentConfig?: AgentConfig;
  packageInfo?: PackageInfo;
}> = ({ from, basePath, cancelUrl, maxStep, agentConfig, packageInfo, children }) => {
  const leftColumn = (
    <EuiFlexGroup direction="column" gutterSize="s" alignItems="flexStart">
      <EuiFlexItem>
        <EuiButtonEmpty size="s" iconType="arrowLeft" flush="left" href={cancelUrl}>
          <FormattedMessage
            id="xpack.ingestManager.createDatasource.cancelLinkText"
            defaultMessage="Cancel"
          />
        </EuiButtonEmpty>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText>
          <h1>
            <FormattedMessage
              id="xpack.ingestManager.createDatasource.pageTitle"
              defaultMessage="Add data source"
            />
          </h1>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiSpacer size="s" />
        <EuiText color="subdued" size="s">
          {from === 'config' ? (
            <FormattedMessage
              id="xpack.ingestManager.createDatasource.pageDescriptionfromConfig"
              defaultMessage="Follow the instructions below to add an integration to this agent configuration."
            />
          ) : (
            <FormattedMessage
              id="xpack.ingestManager.createDatasource.pageDescriptionfromPackage"
              defaultMessage="Follow the instructions below to add this integration to an agent configuration."
            />
          )}
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
  const rightColumn = (
    <EuiFlexGroup justifyContent="flexEnd" direction={'row'} gutterSize="xl">
      <EuiFlexItem grow={false}>
        <EuiSpacer size="s" />
        {agentConfig && from === 'config' ? (
          <EuiDescriptionList style={{ textAlign: 'right' }} textStyle="reverse">
            <EuiDescriptionListTitle>
              <FormattedMessage
                id="xpack.ingestManager.createDatasource.agentConfigurationNameLabel"
                defaultMessage="Configuration"
              />
            </EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              {agentConfig?.name || '-'}
            </EuiDescriptionListDescription>
          </EuiDescriptionList>
        ) : null}
        {packageInfo && from === 'package' ? (
          <EuiDescriptionList style={{ textAlign: 'right' }} textStyle="reverse">
            <EuiDescriptionListTitle>
              <FormattedMessage
                id="xpack.ingestManager.createDatasource.packageNameLabel"
                defaultMessage="Integration"
              />
            </EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              <EuiFlexGroup justifyContent="flexEnd" alignItems="center" gutterSize="s">
                <EuiFlexItem grow={false}>
                  <PackageIcon
                    packageName={packageInfo?.name || ''}
                    version={packageInfo?.version || ''}
                    icons={packageInfo?.icons}
                    size="m"
                  />
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  {packageInfo?.title || packageInfo?.name || '-'}
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiDescriptionListDescription>
          </EuiDescriptionList>
        ) : null}
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  const maxWidth = 770;
  return (
    <WithHeaderLayout
      restrictHeaderWidth={maxWidth}
      restrictWidth={maxWidth}
      leftColumn={leftColumn}
      rightColumn={rightColumn}
      rightColumnGrow={false}
    >
      {children}
    </WithHeaderLayout>
  );
};
