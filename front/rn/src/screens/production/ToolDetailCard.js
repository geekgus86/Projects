import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SensaiCard, SensaiRow, CardLabel } from "../../components";
import I18n from '../../i18n/i18n';

export const ToolDetailCard = (props) => {
  const item = props.item
  return (
    <SensaiCard>
      <Text style={[styles.labelText, styles.bold, { marginBottom: 5 }]}>
        {I18n.t('production_real')}:
      </Text>

      <SensaiRow sizes={[0.5, 0.5]}>
        <View style={styles.twoColumns}>
          <Text style={[styles.labelText, styles.bold]}>
            {I18n.t('oa_pr')}:{" "}
          </Text>
          <Text stlye={styles.labelText}>{'85%'}</Text>
          <CardLabel
            title={''}
            value={85}
            hideValue
            threshold={84}
            unit={'%'}
          />
        </View>
        <View style={styles.twoColumns}>
          <Text style={[styles.labelText, styles.bold]}>
            {I18n.t('real_pieces')}:{" "}
          </Text>
          <Text stlye={styles.labelText}>{item.UnitAuto}</Text>
        </View>
      </SensaiRow>

      <SensaiRow sizes={[0.5, 0.5]}>
        <View style={styles.twoColumns}>
          <Text style={[styles.labelText, styles.bold]}>
            {I18n.t('garbage_pieces')}:{" "}
          </Text>
          <Text stlye={styles.labelText}>{item.UnitScrap}</Text>
        </View>
        <View style={styles.twoColumns}>
          <Text style={[styles.labelText, styles.bold]}>
            {I18n.t('rework_pieces')}:{" "}
          </Text>
          <Text stlye={styles.labelText}>{item.UnitRework}</Text>
        </View>
      </SensaiRow>
    </SensaiCard>
  )
}

const styles = StyleSheet.create({
  twoColumns: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5
  },
  labelText: {
    fontFamily: "OpenSans",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.39,
    color: "#243746"
  },
  bold: {
    fontWeight: "bold"
  },
});