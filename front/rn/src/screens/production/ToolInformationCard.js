import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SensaiCard, SensaiRow } from "../../components";
import I18n from '../../i18n/i18n';

export const ToolInformationCard = (props) => {
  return (
    <SensaiCard>
      {(props.tool!==undefined && props.tool.ToolType==1)?
      <SensaiRow sizes={[1, 1]}>
        <View style={styles.twoColumns}>
          <Text style={[styles.labelText, styles.bold]}>
            {I18n.t('white_batch')}:{" "}
          </Text>
          <Text stlye={styles.labelText}>{props.blanco || '-'}</Text>
        </View>
      </SensaiRow>:
      <SensaiRow sizes={[0.45, 0.45]}>
        <View style={styles.twoColumns}>
          <Text style={[styles.labelText, styles.bold]}>
            {I18n.t('no_of_roll')}:{" "}
          </Text>
          <Text stlye={styles.labelText}>{props.rollo || '-'}</Text>
        </View>
        <View style={styles.twoColumns}>
          <Text style={[styles.labelText, styles.bold]}>
            {I18n.t('batch_of_roll')}:{" "}
          </Text>
          <Text stlye={styles.labelText}>{props.lote || '-'}</Text>
        </View>
      </SensaiRow>}

      <SensaiRow sizes={[0.45, 0.45]}>
        <View style={styles.twoColumns}>
          <Text style={[styles.labelText, styles.bold]}>
            {I18n.t('no_julian')}:{" "}
          </Text>
          <Text stlye={styles.labelText}>{props.numJuliano}</Text>
        </View>
        <View style={styles.twoColumns}>
          <Text style={[styles.labelText, styles.bold]}>
            {I18n.t('design_speed')}:{" "}
          </Text>
          <Text stlye={styles.labelText}>{(props.velocidad || 0) + ' ' + I18n.t('gpm')}</Text>
        </View>
      </SensaiRow>
      <Text style={[styles.labelText, styles.bold, { marginBottom: 5 }]}>
        {I18n.t('scheduled_production')}:
      </Text>
      <SensaiRow sizes={[0.45, 0.45]}>
        <View style={styles.twoColumns}>
          <Text style={[styles.labelText, styles.bold]}>{I18n.t('strikes')}: </Text>
          <Text stlye={styles.labelText}>{props.golpes}</Text>
        </View>
        <View style={styles.twoColumns}>
          <Text style={[styles.labelText, styles.bold]}>{I18n.t('pieces')}: </Text>
          <Text stlye={styles.labelText}>{props.piezas}</Text>
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