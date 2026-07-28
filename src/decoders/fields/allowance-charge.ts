import type { XmlNode } from '#/helpers';
import type { PeppolAllowanceCharge, PeppolLineAllowanceCharge, PeppolLinePriceAllowanceCharge } from '#/schemas/fields/allowance-charge-schema';
import type { RecursivePartial } from '#/types';

import { decodeAmount, encodeAmount } from '#/decoders/fields/amount';
import { decodeSimpleIdentifer, encodeSimpleIdentifier } from '#/decoders/fields/id';
import { bool, getArray, getProp, numOrUnd, strOrUnd } from '#/helpers';

export function decodeAllowanceCharges(
  allowanceCharges: XmlNode,
  ...path: Array<string>
): Array<RecursivePartial<PeppolAllowanceCharge>> | undefined {
  const arr = getArray(allowanceCharges, ...path);
  if (!arr.length) {
    return undefined;
  }

  return arr.map(
    allowanceCharge =>
      ({
        allowanceChargeReason: strOrUnd(allowanceCharge, 'cbc:AllowanceChargeReason'),
        allowanceChargeReasonCode: strOrUnd(allowanceCharge, 'cbc:AllowanceChargeReasonCode'),
        amount: decodeAmount(allowanceCharge, 'cbc:Amount'),
        baseAmount: decodeAmount(allowanceCharge, 'cbc:BaseAmount'),
        chargeIndicator: bool(allowanceCharge, 'cbc:ChargeIndicator'),
        multiplierFactorNumeric: numOrUnd(allowanceCharge, 'cbc:MultiplierFactorNumeric'),
        taxCategory: decodeTaxCategory(allowanceCharge, 'cac:TaxCategory'),
      }) as RecursivePartial<PeppolAllowanceCharge>
  );
}

export function decodeLineAllowanceCharges(
  allowanceCharges: XmlNode,
  ...path: Array<string>
): Array<RecursivePartial<PeppolLineAllowanceCharge>> | undefined {
  const arr = getArray(allowanceCharges, ...path);
  if (!arr.length) {
    return undefined;
  }
  return arr.map(
    allowanceCharge =>
      ({
        allowanceChargeReason: strOrUnd(allowanceCharge, 'cbc:AllowanceChargeReason'),
        allowanceChargeReasonCode: strOrUnd(allowanceCharge, 'cbc:AllowanceChargeReasonCode'),
        amount: decodeAmount(allowanceCharge, 'cbc:Amount'),
        baseAmount: decodeAmount(allowanceCharge, 'cbc:BaseAmount'),
        chargeIndicator: bool(allowanceCharge, 'cbc:ChargeIndicator'),
        multiplierFactorNumeric: numOrUnd(allowanceCharge, 'cbc:MultiplierFactorNumeric'),
      }) as RecursivePartial<PeppolLineAllowanceCharge>
  );
}

export function decodePriceAllowanceCharge(
  allowanceCharges: XmlNode,
  ...path: Array<string>
): RecursivePartial<PeppolLinePriceAllowanceCharge> | undefined {
  const allowanceCharge = getProp(allowanceCharges, ...path);
  if (!allowanceCharge) {
    return undefined;
  }
  return {
    amount: decodeAmount(allowanceCharge, 'cbc:Amount'),
    baseAmount: decodeAmount(allowanceCharge, 'cbc:BaseAmount'),
    chargeIndicator: bool<false>(allowanceCharge, 'cbc:ChargeIndicator'),
  };
}

export function decodeTaxCategory(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolAllowanceCharge['taxCategory']> | undefined {
  const taxCategory = getProp(doc, ...path);
  if (!taxCategory) {
    return undefined;
  }

  return {
    id: strOrUnd(taxCategory, 'cbc:ID'),
    percent: numOrUnd(taxCategory, 'cbc:Percent'),
    taxSchemeId: decodeSimpleIdentifer(taxCategory, 'cac:TaxScheme'),
  };
}

export function encodeAllowanceCharges(allowanceCharges: Array<PeppolAllowanceCharge> | undefined) {
  return allowanceCharges?.map(allowanceCharge => ({
    'cbc:ChargeIndicator': allowanceCharge.chargeIndicator,
    'cbc:AllowanceChargeReasonCode': allowanceCharge.allowanceChargeReasonCode,
    'cbc:AllowanceChargeReason': allowanceCharge.allowanceChargeReason,
    'cbc:MultiplierFactorNumeric': allowanceCharge.multiplierFactorNumeric,
    'cbc:Amount': encodeAmount(allowanceCharge.amount),
    'cbc:BaseAmount': encodeAmount(allowanceCharge.baseAmount),
    'cac:TaxCategory': encodeTaxCategory(allowanceCharge.taxCategory),
  }));
}

export function encodeLineAllowanceCharges(allowanceCharges: Array<PeppolLineAllowanceCharge> | undefined) {
  return allowanceCharges?.map(allowanceCharge => ({
    'cbc:ChargeIndicator': allowanceCharge.chargeIndicator,
    'cbc:AllowanceChargeReasonCode': allowanceCharge.allowanceChargeReasonCode,
    'cbc:AllowanceChargeReason': allowanceCharge.allowanceChargeReason,
    'cbc:MultiplierFactorNumeric': allowanceCharge.multiplierFactorNumeric,
    'cbc:Amount': encodeAmount(allowanceCharge.amount),
    'cbc:BaseAmount': encodeAmount(allowanceCharge.baseAmount),
  }));
}

export function encodePriceAllowanceCharges(allowanceCharge: PeppolLinePriceAllowanceCharge | undefined) {
  if (!allowanceCharge) {
    return undefined;
  }

  return {
    'cbc:ChargeIndicator': allowanceCharge.chargeIndicator,
    'cbc:Amount': encodeAmount(allowanceCharge.amount),
    'cbc:BaseAmount': encodeAmount(allowanceCharge.baseAmount),
  };
}

export function encodeTaxCategory(taxCategory: PeppolAllowanceCharge['taxCategory']) {
  if (!taxCategory) {
    return undefined;
  }
  return { 'cbc:ID': taxCategory.id, 'cbc:Percent': taxCategory.percent, 'cac:TaxScheme': encodeSimpleIdentifier(taxCategory.taxSchemeId) };
}
