import React from 'react';
import PropTypes from 'prop-types';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import {
  BorderStyle,
  BorderColor,
  BorderRadius,
  AlignItems,
  BackgroundColor,
  IconColor,
  TextVariant,
  TextColor,
  Display,
  JustifyContent,
} from '../../../../helpers/constants/design-system';
import {
  AvatarIcon,
  Icon,
  AvatarIconSize,
  Box,
  IconName,
  Text,
  IconSize,
} from '../../../component-library';
import {
  DelineatorType,
  getDelineatorTitle,
} from '../../../../helpers/constants/snaps';

export const SnapDelineator = ({
  snapName,
  type = DelineatorType.default,
  isCollapsable = false,
  isCollapsed = false,
  children,
  onClick,
  boxProps,
}) => {
  const t = useI18nContext();
  const isError =
    type === DelineatorType.Error || type === DelineatorType.Warning;

  return (
    <Box
      className="snap-delineator__wrapper"
      borderStyle={BorderStyle.solid}
      borderColor={BorderColor.borderDefault}
      borderRadius={BorderRadius.LG}
      backgroundColor={
        isError ? BackgroundColor.errorMuted : BackgroundColor.backgroundDefault
      }
      {...boxProps}
    >
      <Box
        className="snap-delineator__header"
        display={Display.Flex}
        alignItems={AlignItems.center}
        justifyContent={JustifyContent.spaceBetween}
        padding={1}
        style={{ borderBottomWidth: isCollapsed ? 0 : 1 }}
      >
        <Box display={Display.Flex} alignItems={AlignItems.center}>
          <AvatarIcon
            iconName={IconName.Snaps}
            size={AvatarIconSize.Xs}
            backgroundColor={
              isError ? IconColor.errorDefault : IconColor.infoDefault
            }
            iconProps={{
              color: IconColor.infoInverse,
            }}
          />
          <Text
            variant={TextVariant.bodySm}
            color={isError ? TextColor.textDefault : TextColor.textAlternative}
            className="snap-delineator__header__text"
            marginLeft={1}
            marginTop={0}
            marginBottom={0}
          >
            {t(getDelineatorTitle(type), [snapName])}
          </Text>
        </Box>
        {isCollapsable && (
          <Icon
            name={isCollapsed ? IconName.ArrowDown : IconName.ArrowUp}
            size={IconSize.Sm}
            color={IconColor.iconMuted}
            className="snap-delineator__expansion-icon"
            onClick={onClick}
          />
        )}
      </Box>
      <Box
        className="snap-delineator__content"
        padding={4}
        display={isCollapsable && isCollapsed ? Display.None : Display.Block}
      >
        {children}
      </Box>
    </Box>
  );
};

SnapDelineator.propTypes = {
  snapName: PropTypes.string,
  type: PropTypes.string,
  isCollapsable: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  onClick: PropTypes.func,
  boxProps: PropTypes.object,
  children: PropTypes.node,
};
