AutoFeeder將分為三階段實作：

1. 手機與餵食器在LAN中互聯，用tcp/ip溝通，設定餵食時間與餵食量

2. 手機從外網連結回餵食器，實作餵食器彈射飼料功能 (mqtt or p2p)

3. p2p連線live view or youtube live stream，傳遞影像和聲音，鏡頭與餵食器轉動

預計使用[海思hi3518開發板 hi3518e hi3518ev200](https://world.taobao.com/item/558321632409.htm?spm=a21wu.10013406-tw.0.0.443f47cbxepaN1)
