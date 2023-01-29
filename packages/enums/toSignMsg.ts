// 骑缝章描述
export enum perforationSeal {
  successTitle = '提示',
  successMsg = '骑缝章签署成功',
}

// 关键字章描述
export enum keyWordSeal {
  successTitle = '提示',
  successMsg = '关键字章签署成功',
}

// 自由签描述
export enum HybridSeal {
  title = '提示',
  USBKeyExcessiveNumber = 'UKEY只能加盖一个',
  successMsg = '自由盖章签署成功',
}

// webSocket 提示
export enum webSocketInfo {
  warningTitle = '警告',
  devListLeng = 'ukey数量大于2',
  continueToSign = '继续签章',
  reSign = '重新签章',
  notDev = '未检测到UKEY',
  notDev1 = '未检测到UKEY,请插入后点击“继续签章”或者直接点击“重新签章”',
  notDev2 = '请插入与当前印章对应的UKEY, 插入后点击“继续签章”或者直接点击“重新签章”',
}

// ukey 取章和盖章时，保存在本地键值
export const toSignDevId = 'toSignDevId';
