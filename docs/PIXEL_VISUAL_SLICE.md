# Melonia — thử nghiệm pixel art và rà soát chuyển đổi

Ngày rà soát: 2026-11-22. Mốc source: `94fe5bc`, nhánh `feat/pixel-visual-slice`.

## Trạng thái và phạm vi

Owner đã yêu cầu chuẩn bị thử nghiệm chuyển sang pixel art hiện đại. Đây là tài liệu đề xuất và audit source, chưa phải final production lock. D-001 và hướng hand-painted trong [ART_DIRECTION.md](ART_DIRECTION.md) vẫn là mốc đối chiếu; ngoại lệ thử nghiệm chỉ áp dụng cho nhánh này theo yêu cầu hiện tại. Không sửa gameplay, renderer hoặc asset trong nhiệm vụ chuẩn bị.

Chỉ đánh giá cùng một lát cắt đang có: player, Elias, một cottage, cây, cỏ, đường và hồ. Không thêm công trình, NPC, hoạt động, hệ thống ánh sáng hoặc gameplay. Không mua hay tạo asset trong bước này.

## Hướng hình ảnh đề xuất — chưa khóa

- Fantasy đời thường, ấm và có sức sống; silhouette dễ đọc hơn mật độ chi tiết. Giữ góc nhìn top-down nhẹ 3/4, trục X/Y hiện tại, không chuyển sang isometric.
- Pixel được đặt có chủ đích: cụm màu rõ, cạnh sắc, ít nhiễu và ít dithering. Tránh texture ảnh, nét cọ mờ, gradient liên tục và viền anti-alias bán trong suốt. Alpha trong suốt cho sprite; bóng dùng mảng màu tiết chế.
- Bảng màu chung: xanh lá dịu, đất ấm, mái đất nung, nước xanh; dùng các ramp sáng/tối nhất quán và màu nhấn trang phục giúp player tách khỏi nền. Chưa chốt số màu hoặc mã màu sản xuất.
- Ánh sáng vẽ sẵn từ phía trên trái; không thêm lighting runtime. Cùng một mật độ pixel cảm nhận cho người, cây, nhà và nền; không trộn nền painted với nhân vật pixel trong bản nghiệm thu đồng bộ.
- Nhân vật gọn, đầu và tay chân đọc được ở kích thước chơi thực tế. Khởi điểm đề xuất để thử là canvas thiết kế 24×32, hiển thị 72×96; tỷ lệ cơ thể và grid cần review trong game, chưa được duyệt làm chuẩn.
- Các frame dùng cùng canvas, vị trí chân và alpha padding để không nhảy khi đổi animation. Side mặc định nhìn phải, mirror sang trái; không đặt chi tiết bất đối xứng quan trọng trong lượt thử đầu.
- UI hiện tại tiếp tục dùng chữ dễ đọc, hỗ trợ đầy đủ tiếng Việt. Chưa yêu cầu font pixel, icon mới hoặc skin HUD.

## Những phụ thuộc đã xác minh từ source

| File / nhóm | Phụ thuộc hiện tại | Việc cần làm khi tích hợp pixel (chưa thực hiện) |
| --- | --- | --- |
| `public/assets/sprites/player/*.png` | 9 file: 3 idle, 6 walk; được load bằng từng ảnh riêng | Thay hình bằng bộ pixel đủ down/up/side, giữ canvas và điểm chân tương thích |
| `public/assets/sprites/npc/elias-idle-0.png` | Một ảnh Elias, lặp làm idle | Thay bằng một sprite pixel cùng tỷ lệ player; chưa cần thêm animation |
| `public/assets/environment/*.png` | 5 ảnh: grass, path, cottage, tree-oak, pond | Thay đồng bộ; giữ vị trí chân, đường bờ và footprint hiện có để không đổi vùng đi lại |
| `src/assets/AssetManifest.ts` | Đường dẫn hand-painted; display player/NPC 72×96, cottage 280×245, tree 112×168, pond 480×360 | Cập nhật đường dẫn nếu lưu bộ pixel riêng. Giữ key và display size trong lượt thử tương thích; chỉ đổi kích thước sau review được phép |
| `src/main.ts` | `pixelArt: false`, `antialias: true`, canvas 960×540, scale FIT | Cần thử nearest filtering / pixelArt và tắt smoothing; không đổi viewport hoặc physics trong bước chuẩn bị |
| `src/styles.css` | Canvas bị co giãn theo khung responsive, chưa có `image-rendering` | Cần kiểm tra CSS và tỷ lệ hiển thị nguyên; chỉ bật pixelArt ở Phaser chưa bảo đảm pixel sắc ở mọi cửa sổ |
| `src/scenes/VillageScene.ts` | Grass hiển thị tile 256, path 128; origin môi trường bottom-centre; camera follow nội suy 0.10; depth theo y | Giữ layout/collider. Kiểm tra đường nối tile, vị trí chân và rung pixel khi camera chạy; cân nhắc làm tròn vị trí render ở bước tích hợp, không làm tròn physics |
| `src/entities/Player.ts`, `src/entities/Npc.ts` | Sprite mặc định origin giữa; body tính theo texture, rộng khoảng 35%, cao khoảng 12%, đặt sát đáy | Có thể giữ nguyên code nếu asset tương thích. Canvas/padding khác sẽ cần kiểm chứng body; không đổi origin sang chân một cách máy móc |
| `docs/ART_DIRECTION.md`, `docs/ASSET_MANIFEST.md` | Mô tả bộ painted và chuẩn kỹ thuật cũ | ART_DIRECTION đã có liên kết ngoại lệ thử nghiệm. Cập nhật inventory/status khi pixel thực sự được tích hợp, không đánh dấu ready trước kiểm thử |

`docs/ART_DIRECTION.md` nêu canvas nhân vật 96×128 như hướng dẫn; `docs/ASSET_MANIFEST.md` ghi 192×256 cho ảnh hiện có. Không coi hướng dẫn cũ là kích thước runtime bắt buộc: kiểm tra PNG và texture trước thay thế.

Đã đọc header PNG: player và Elias đều 192×256; cottage 640×560, tree 256×384, grass/path 256×256, pond 800×600. So sánh hash file xác nhận idle-up trùng idle-down, walk-up và walk-side trùng hai frame walk-down tương ứng; đây là placeholder thực tế, không chỉ là ghi chú cũ trong tài liệu.

Manifest đăng ký 4 key idle cho mỗi hướng nhưng cùng trỏ một PNG; walk có 2 key/hướng. NPC thực tế lặp `idleKey` bốn lần, chưa dùng các key `elias-idle-1..3` để tạo chuyển động. Giữ sáu animation key `idle-down/up/side`, `walk-down/up/side` và bản sửa mirror trái/phải; không nâng số frame trong phạm vi này.

## File có thể giữ nguyên

| File / nhóm | Điều kiện giữ nguyên |
| --- | --- |
| `src/game/WorldClock.ts`, `FishingSystem.ts`, `Inventory.ts` | Không phụ thuộc ảnh hay phong cách art |
| `src/world/WorldLayout.ts` | Giữ tọa độ, spawn, tương tác và collider; art phải khớp hình học đang có |
| `src/scenes/PreloadScene.ts` | Tiếp tục dùng PNG riêng với key/path từ manifest; atlas/spritesheet chưa cần thiết |
| `src/entities/Player.ts`, `Npc.ts` | Giữ contract key, canvas, alpha padding và vị trí chân để không đổi hitbox hoặc hành vi |
| `src/scenes/VillageScene.ts` | Có thể giữ nguyên nếu art khớp tile/display size; mọi chỉnh renderer sau này phải tách khỏi logic gameplay/collision |
| `src/ui/HudOverlay.ts`, `index.html` | Giữ HUD, tương tác và chữ hiện có; pixel skin UI là tùy chọn tương lai |
| `package.json`, lockfile, cấu hình build | Không cần thư viện hay dịch vụ mới cho PNG pixel |

## Checklist asset tối thiểu cho lượt tích hợp đầu

Các mục dưới đây đều chưa được tạo hoặc nghiệm thu pixel trong nhiệm vụ này.

- [ ] Player: 3 ảnh idle (down/up/side), 2 frame walk cho mỗi hướng — tổng 9 PNG. Up thực sự nhìn sau, side thực sự nhìn ngang; không dùng down làm hình thay thế cho cả ba hướng.
- [ ] Elias: 1 PNG idle nhìn trước, tỷ lệ và điểm chân tương thích player.
- [ ] Môi trường: 1 tile cỏ liền mạch, 1 tile đường dùng được cho hai dải đường hiện có, 1 cottage, 1 cây oak dùng lại bốn vị trí, 1 hồ khớp vùng nước/collider và điểm đứng câu hiện tại — tổng 5 PNG.
- [ ] Mỗi file có canvas, vùng alpha, điểm chân/neo, display size và đường dẫn/key được ghi lại. Tổng tối thiểu là 15 PNG; chưa cần atlas, mái tách lớp, animation nước, bush hay icon inventory mới.
- [ ] Có palette mẫu và provenance nguồn asset ghi trong tài liệu, không cần file palette runtime hoặc asset pack ngoài phạm vi.

Ưu tiên tương thích: giữ kích thước PNG gốc và footprint ở lượt thay ảnh đầu. Có thể vẽ nhân vật 24×32 rồi xuất nearest ×8 thành 192×256 để giữ contract texture hiện tại; đây chỉ là phương án đề xuất, không phải asset đã có. Sau scale runtime 72×96, pixel thiết kế nhân vật sẽ tương ứng 3 world px. Các kích thước môi trường hiện tại không bảo đảm cùng bội số này; cần thử canvas/padding và kiểm tra trong game trước khi khóa grid chung. Không đổi scale toàn thế giới để ép grid trong nhiệm vụ này.

## Điều kiện nghiệm thu cho bước tích hợp sau

1. Chạy game và review toàn cảnh ở kích thước thật, ít nhất một viewport mục tiêu và một khung responsive; pixel sắc, tile không lộ đường nối, camera không tạo rung khó chịu. Không nghiệm thu từ một illustration riêng.
2. WASD, idle/walk đủ hướng, A/D mirror đúng, chân không nhảy giữa frame; không missing texture hay animation key.
3. So sánh body thực tế trước/sau với collider overlay; ba vị trí công trình vô hình vẫn đi qua được, cottage/cây/hồ và điểm tương tác không đổi. Không chấp nhận lệch gameplay chỉ để khớp art mới.
4. Đồng hồ, nói chuyện, fishing và inventory giữ nguyên hành vi. `npm run build` và `git diff --check` đạt.
5. Ghi rõ kết quả browser đã đo, điều còn suy luận và phản hồi owner; chỉ khóa phong cách sản xuất khi có phê duyệt riêng.

Audit này xác nhận phụ thuộc source, không chứng minh chất lượng pixel art hoặc độ sắc của renderer. Chưa có asset pixel trong game để thực hiện nghiệm thu hình ảnh.
