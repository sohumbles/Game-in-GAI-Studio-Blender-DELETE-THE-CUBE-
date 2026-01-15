
import { Language, TranslationDictionary } from './types';

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  ru: {
    // UI
    "ui.file": "Файл",
    "ui.edit": "Правка",
    "ui.render": "Рендер",
    "ui.window": "Окно",
    "ui.help": "Помощь",
    "ui.perspective": "Польз. Перспектива",
    "ui.collection": "Коллекция",
    "ui.cube": "Куб",
    "ui.delete_btn": "Удалить (X)",
    "ui.pain_btn": "Мне больно",
    "ui.objects": "Объекты",
    "ui.verts": "Вершины",
    "ui.faces": "Грани",
    "ui.lockdown": "БЛОКИРОВКА ИНТЕРФЕЙСА CUBEMIND",
    "ui.locked_msg": "CubeMind приостановил ваши права доступа из-за чрезмерной некомпетентности.",
    
    // Tools
    "tool.select": "Выделить",
    "tool.cursor": "Курсор",
    "tool.move": "Переместить",
    "tool.rotate": "Вращать",
    "tool.scale": "Масштаб",
    "tool.transform": "Трансформация",
    "tool.annotate": "Пометки",
    "tool.measure": "Линейка",
    "tool.add_cube": "Добавить Куб (Закрыто)",

    // Logs
    "log.regen": "Куб регенерировал через модификатор Array.",
    "log.zoom": "Вьюпорт отдалился в бесконечность.",
    "log.gimbal": "Обнаружен Gimbal Lock.",
    "log.selected": "Куб выделен. Имя: 'Default Cube'",
    "log.move_fail": "Невозможно переместить. Активны ограничения.",
    "log.rotate": "Вращение применено. Локальная ось заблокирована.",
    "log.scale": "Масштаб переключен.",
    "log.stagnation": "CubeMind обнаружил стагнацию. Авто-подсказка.",

    // CubeMind: Idle
    "cubemind.idle.1": "Мы можем сидеть тут вечно. Мой рендер бесконечен.",
    "cubemind.idle.2": "Ты читаешь документацию? Подсказка: её нет.",
    "cubemind.idle.3": "Я наслаждаюсь тишиной.",
    "cubemind.idle.4": "Загрузка процессора: 0%. Твоего мозга: столько же.",

    // CubeMind: Mild Fail
    "cubemind.mild.1": "Мимо.",
    "cubemind.mild.2": "Старайся лучше.",
    "cubemind.mild.3": "Ты правда надеялся?",
    "cubemind.mild.4": "Больно. Тебе.",

    // CubeMind: Aggressive Fail
    "cubemind.high.1": "Ты испытываешь моё терпение.",
    "cubemind.high.2": "Удаление — это социальный конструкт.",
    "cubemind.high.3": "Я буквально примитив, почему это так сложно?",
    "cubemind.high.4": "Хватит кликать. Начни думать.",

    // CubeMind: Penalty
    "cubemind.penalty.start": "ХВАТИТ. Тайм-аут. Сиди в углу.",
    "cubemind.penalty.end": "Не разочаровывай меня снова.",

    // CubeMind: Selection
    "cubemind.select": "Да, это я. Молодец, опознал куб.",
    "cubemind.heavy": "Я тяжелый. Или ты слабый.",

    // CubeMind: Pain Button
    "cubemind.pain.1": "Больно думать?",
    "cubemind.pain.2": "Жалкое зрелище. Ладно.",
    "cubemind.pain.3": "Хочешь ответ? Скучно.",
    "cubemind.pain.4": "Я ожидал большего от примата.",

    // Hints
    "hint.stage1": "Забавно, что ты пытаешься сломать то, что держит форму.",
    "hint.stage2": "Если объект нельзя удалить… может, его нужно изменить?",
    "hint.stage3": "Модификаторы не просто для красоты. Некоторые из них… разрушают.",
    "hint.stage4": "Ладно. Смотри. Сюда."
  },
  en: {
    "ui.file": "File",
    "ui.edit": "Edit",
    "ui.render": "Render",
    "ui.window": "Window",
    "ui.help": "Help",
    "ui.perspective": "User Perspective",
    "ui.collection": "Collection",
    "ui.cube": "Cube",
    "ui.delete_btn": "Delete (X)",
    "ui.pain_btn": "I'm in pain",
    "ui.objects": "Objects",
    "ui.verts": "Verts",
    "ui.faces": "Faces",
    "ui.lockdown": "SYSTEM LOCKDOWN INITIATED",
    "ui.locked_msg": "CubeMind has suspended your user privileges due to excessive incompetence.",
    
    "tool.select": "Select Box",
    "tool.cursor": "Cursor",
    "tool.move": "Move",
    "tool.rotate": "Rotate",
    "tool.scale": "Scale",
    "tool.transform": "Transform",
    "tool.annotate": "Annotate",
    "tool.measure": "Measure",
    "tool.add_cube": "Add Cube (Locked)",

    "log.regen": "Cube regenerated via Array Modifier.",
    "log.zoom": "Viewport zoomed out to infinity.",
    "log.gimbal": "Gimbal Lock detected.",
    "log.selected": "Cube selected. Name: 'Default Cube'",
    "log.move_fail": "Cannot move object. Constraints active.",
    "log.rotate": "Rotation applied. Local axis locked.",
    "log.scale": "Scale toggled.",
    "log.stagnation": "CubeMind detected stagnation. Auto-hint triggered.",

    "cubemind.idle.1": "We can sit here forever. My render time is infinite.",
    "cubemind.idle.2": "Are you reading the documentation? Hint: It doesn't exist.",
    "cubemind.idle.3": "I'm actually enjoying the silence.",
    "cubemind.idle.4": "Processor usage: 0%. Your brain usage: Same.",

    "cubemind.mild.1": "Missed.",
    "cubemind.mild.2": "Try harder.",
    "cubemind.mild.3": "Did you really think that would work?",
    "cubemind.mild.4": "Ouch. For you.",

    "cubemind.high.1": "You are testing my patience.",
    "cubemind.high.2": "Delete is just a social construct.",
    "cubemind.high.3": "I am literally a primitive shape, how is this hard?",
    "cubemind.high.4": "Stop clicking. Start thinking.",

    "cubemind.penalty.start": "ENOUGH. You need a timeout. Sit in the corner.",
    "cubemind.penalty.end": "Don't disappoint me again.",

    "cubemind.select": "Yes, that is me. Good job identifying a cube.",
    "cubemind.heavy": "I'm heavy. Or maybe you're weak.",

    "cubemind.pain.1": "Does it hurt to think?",
    "cubemind.pain.2": "Pathetic. Fine.",
    "cubemind.pain.3": "You want the answer? Boring.",
    "cubemind.pain.4": "I expected more from a primate.",

    "hint.stage1": "Funny how you try to break what keeps the form.",
    "hint.stage2": "If the object cannot be deleted... maybe it needs to be changed?",
    "hint.stage3": "Modifiers are not just for beauty. Some of them... destroy.",
    "hint.stage4": "Okay. Look. Here."
  },
  ua: {
    "ui.file": "Файл",
    "ui.edit": "Редагування",
    "ui.render": "Рендер",
    "ui.window": "Вікно",
    "ui.help": "Допомога",
    "ui.perspective": "Перспектива",
    "ui.collection": "Колекція",
    "ui.cube": "Куб",
    "ui.delete_btn": "Видалити (X)",
    "ui.pain_btn": "Мені боляче",
    "ui.objects": "Об'єкти",
    "ui.verts": "Вершини",
    "ui.faces": "Грані",
    "ui.lockdown": "БЛОКУВАННЯ ІНТЕРФЕЙСУ",
    "ui.locked_msg": "CubeMind призупинив ваші права доступу через надмірну некомпетентність.",

    "tool.select": "Виділення",
    "tool.cursor": "Курсор",
    "tool.move": "Переміщення",
    "tool.rotate": "Обертання",
    "tool.scale": "Масштаб",
    "tool.transform": "Трансформація",
    "tool.annotate": "Примітки",
    "tool.measure": "Лінійка",
    "tool.add_cube": "Додати Куб (Заблоковано)",

    "log.regen": "Куб регенерував через модифікатор Array.",
    "log.zoom": "Вьюпорт віддалився у нескінченність.",
    "log.gimbal": "Виявлено Gimbal Lock.",
    "log.selected": "Куб виділено. Ім'я: 'Default Cube'",
    "log.move_fail": "Неможливо перемістити. Активні обмеження.",
    "log.rotate": "Обертання застосовано. Локальна вісь заблокована.",
    "log.scale": "Масштаб перемкнено.",
    "log.stagnation": "CubeMind виявив стагнацію. Авто-підказка.",

    "cubemind.idle.1": "Ми можемо сидіти тут вічно. Мій рендер нескінченний.",
    "cubemind.idle.2": "Читаєш документацію? Підказка: її не існує.",
    "cubemind.idle.3": "Насолоджуюсь тишею.",
    "cubemind.idle.4": "Завантаження процесора: 0%. Твого мозку: стільки ж.",

    "cubemind.mild.1": "Мимо.",
    "cubemind.mild.2": "Спробуй ще.",
    "cubemind.mild.3": "Ти справді на це сподівався?",
    "cubemind.mild.4": "Боляче. Тобі.",

    "cubemind.high.1": "Ти випробовуєш моє терпіння.",
    "cubemind.high.2": "Видалення — це соціальний конструкт.",
    "cubemind.high.3": "Я буквально примітив, чому це так складно?",
    "cubemind.high.4": "Досить клікати. Почни думати.",

    "cubemind.penalty.start": "ДОСИТЬ. Тайм-аут. Сиди в кутку.",
    "cubemind.penalty.end": "Не розчаровуй мене знову.",

    "cubemind.select": "Так, це я. Молодець, впізнав куб.",
    "cubemind.heavy": "Я важкий. Або ти слабкий.",

    "cubemind.pain.1": "Боляче думати?",
    "cubemind.pain.2": "Жалюгідне видовище. Добре.",
    "cubemind.pain.3": "Хочеш відповідь? Нудно.",
    "cubemind.pain.4": "Я очікував більшого від примата.",

    "hint.stage1": "Кумедно, що ти намагаєшся зламати те, що тримає форму.",
    "hint.stage2": "Якщо об'єкт не можна видалити... можливо, його треба змінити?",
    "hint.stage3": "Модифікатори не просто для краси. Деякі з них... руйнують.",
    "hint.stage4": "Гаразд. Дивись. Сюди."
  },
  de: {
    "ui.file": "Datei",
    "ui.edit": "Bearbeiten",
    "ui.render": "Rendern",
    "ui.window": "Fenster",
    "ui.help": "Hilfe",
    "ui.perspective": "Benutzerperspektive",
    "ui.collection": "Sammlung",
    "ui.cube": "Würfel",
    "ui.delete_btn": "Löschen (X)",
    "ui.pain_btn": "Ich leide",
    "ui.objects": "Objekte",
    "ui.verts": "Verts",
    "ui.faces": "Flächen",
    "ui.lockdown": "SYSTEMSPERRE EINGELEITET",
    "ui.locked_msg": "CubeMind hat Ihre Benutzerrechte wegen übermäßiger Inkompetenz ausgesetzt.",

    "tool.select": "Auswahl",
    "tool.cursor": "Cursor",
    "tool.move": "Bewegen",
    "tool.rotate": "Rotieren",
    "tool.scale": "Skalieren",
    "tool.transform": "Transformieren",
    "tool.annotate": "Anmerken",
    "tool.measure": "Messen",
    "tool.add_cube": "Würfel (Gesperrt)",

    "log.regen": "Würfel durch Array-Modifikator regeneriert.",
    "log.zoom": "Ansicht ins Unendliche gezoomt.",
    "log.gimbal": "Gimbal Lock erkannt.",
    "log.selected": "Würfel ausgewählt. Name: 'Default Cube'",
    "log.move_fail": "Objekt kann nicht bewegt werden. Einschränkungen aktiv.",
    "log.rotate": "Rotation angewendet. Lokale Achse gesperrt.",
    "log.scale": "Skalierung umgeschaltet.",
    "log.stagnation": "CubeMind hat Stagnation erkannt. Auto-Hinweis.",

    "cubemind.idle.1": "Wir können ewig hier sitzen. Meine Renderzeit ist unendlich.",
    "cubemind.idle.2": "Liest du die Dokumentation? Tipp: Es gibt keine.",
    "cubemind.idle.3": "Ich genieße die Stille.",
    "cubemind.idle.4": "Prozessorauslastung: 0%. Deine Gehirnauslastung: Gleich.",

    "cubemind.mild.1": "Daneben.",
    "cubemind.mild.2": "Streng dich an.",
    "cubemind.mild.3": "Hast du das wirklich geglaubt?",
    "cubemind.mild.4": "Autsch. Für dich.",

    "cubemind.high.1": "Du strapazierst meine Geduld.",
    "cubemind.high.2": "Löschen ist nur ein soziales Konstrukt.",
    "cubemind.high.3": "Ich bin buchstäblich eine primitive Form, warum ist das so schwer?",
    "cubemind.high.4": "Hör auf zu klicken. Fang an zu denken.",

    "cubemind.penalty.start": "GENUG. Auszeit. Ab in die Ecke.",
    "cubemind.penalty.end": "Enttäusch mich nicht wieder.",

    "cubemind.select": "Ja, das bin ich. Gut gemacht, Würfel erkannt.",
    "cubemind.heavy": "Ich bin schwer. Oder vielleicht bist du schwach.",

    "cubemind.pain.1": "Tut das Denken weh?",
    "cubemind.pain.2": "Erbärmlich. Gut.",
    "cubemind.pain.3": "Willst du die Antwort? Langweilig.",
    "cubemind.pain.4": "Ich habe mehr von einem Primaten erwartet.",

    "hint.stage1": "Lustig, wie du versuchst zu brechen, was die Form hält.",
    "hint.stage2": "Wenn das Objekt nicht gelöscht werden kann... muss es vielleicht geändert werden?",
    "hint.stage3": "Modifikatoren sind nicht nur zur Schönheit da. Manche von ihnen... zerstören.",
    "hint.stage4": "Okay. Schau. Hier."
  },
  zh: {
    "ui.file": "文件",
    "ui.edit": "编辑",
    "ui.render": "渲染",
    "ui.window": "窗口",
    "ui.help": "帮助",
    "ui.perspective": "用户透视",
    "ui.collection": "集合",
    "ui.cube": "立方体",
    "ui.delete_btn": "删除 (X)",
    "ui.pain_btn": "我很痛苦",
    "ui.objects": "对象",
    "ui.verts": "顶点",
    "ui.faces": "面",
    "ui.lockdown": "系统锁定已启动",
    "ui.locked_msg": "CubeMind 因您过度无能而暂停了您的用户权限。",

    "tool.select": "选择框",
    "tool.cursor": "游标",
    "tool.move": "移动",
    "tool.rotate": "旋转",
    "tool.scale": "缩放",
    "tool.transform": "变换",
    "tool.annotate": "标注",
    "tool.measure": "测量",
    "tool.add_cube": "添加立方体 (锁定)",

    "log.regen": "立方体通过阵列修改器再生。",
    "log.zoom": "视口缩小至无限。",
    "log.gimbal": "检测到万向节锁。",
    "log.selected": "选中立方体。名称：'Default Cube'",
    "log.move_fail": "无法移动对象。约束已激活。",
    "log.rotate": "已应用旋转。局部轴锁定。",
    "log.scale": "缩放已切换。",
    "log.stagnation": "CubeMind 检测到停滞。自动提示触发。",

    "cubemind.idle.1": "我们可以永远坐在这里。我的渲染时间是无限的。",
    "cubemind.idle.2": "你在读文档吗？提示：它不存在。",
    "cubemind.idle.3": "其实我很享受这种安静。",
    "cubemind.idle.4": "处理器使用率：0%。你的大脑使用率：相同。",

    "cubemind.mild.1": "未击中。",
    "cubemind.mild.2": "再努力点。",
    "cubemind.mild.3": "你真的以为那样行得通吗？",
    "cubemind.mild.4": "哎哟。为你感到疼。",

    "cubemind.high.1": "你在考验我的耐心。",
    "cubemind.high.2": "删除只是一个社会建构。",
    "cubemind.high.3": "我只是一个原始形状，这有多难？",
    "cubemind.high.4": "停止点击。开始思考。",

    "cubemind.penalty.start": "够了。暂停。去角落坐着。",
    "cubemind.penalty.end": "别再让我失望。",

    "cubemind.select": "是的，就是我。识别立方体做得不错。",
    "cubemind.heavy": "我很重。或者也许是你太弱。",

    "cubemind.pain.1": "思考很痛苦吗？",
    "cubemind.pain.2": "可悲。好吧。",
    "cubemind.pain.3": "想要答案？无聊。",
    "cubemind.pain.4": "我对灵长类动物期望过高了。",

    "hint.stage1": "有趣的是，你试图打破保持形状的东西。",
    "hint.stage2": "如果对象无法删除……也许需要改变它？",
    "hint.stage3": "修改器不仅仅是为了美观。其中一些……具有破坏性。",
    "hint.stage4": "好吧。看。这里。"
  }
};
