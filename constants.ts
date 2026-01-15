import { LevelData } from './types';

export const GAME_TITLE = "BLENDER: DELETE THE CUBE";

export const GDD_CONTENT = {
  summary: `
    **Genre:** Logic / Sandbox / Physics Puzzle / Absurdist Humor
    
    **Premise:** The player is trapped inside a cursed version of Blender. The Universe consists entirely of the "Default Cube". The goal is simple: Delete the Cube. The problem: The Cube fights back, the software is glitchy, and "Delete" is rarely the answer.
  `,
  mechanics: [
    "**Cursor Control:** Move, Select, Rotate (R), Scale (S), Grab (G).",
    "**Modifier Stack:** Apply modifiers that act as puzzle mechanics (e.g., Mirror to duplicate keys, Boolean to cut holes).",
    "**The Console:** The game communicates via the Python console, mocking the user's failures.",
    "**Broken Tools:** The 'Delete' key (X) usually triggers a punishment (Cube multiplies, Player shrinks, Physics break)."
  ],
  monetization: [
    "**Premium Game:** One-time purchase ($9.99 - $14.99).",
    "**DLC 'Render Farms':** Extra hard levels focusing on lighting and rendering bugs.",
    "**Cosmetics:** Skins for the Cursor and UI Themes (Maya Blue, 3ds Max Grey)."
  ]
};

export const LEVELS: LevelData[] = [
  { id: 1, name: "Delete is Broken", description: "Pressing X does nothing.", solution: "Use the 'Press' hydraulic machine to crush the cube physically." },
  { id: 4, name: "Magnetic Hell", description: "Cube attracts everything.", solution: "Align 3 Negative Force Fields to cancel the gravity." },
  { id: 8, name: "Boolean Nightmare", description: "Cube is indestructible.", solution: "Construct a Boolean Difference setup using 4 primitive spheres." },
  { id: 12, name: "Material Overheat", description: "Shader complexity infinite.", solution: "Disconnect nodes in the Shader Editor until the cube turns invisible/null." },
  { id: 16, name: "Modifier Storm", description: "Cube regenerates via Array.", solution: "Break the parenting link in the Outliner before applying the modifier." }
];

export const CS_SCRIPTS = {
  LocalizationManager: `
using UnityEngine;
using System.Collections.Generic;
using System.IO;

public class LocalizationManager : MonoBehaviour {
    public static LocalizationManager Instance;
    public string currentLanguage = "ru";
    private Dictionary<string, string> localizedText;

    void Awake() {
        Instance = this;
        LoadLanguage(currentLanguage);
    }

    public void LoadLanguage(string langCode) {
        currentLanguage = langCode;
        string filePath = Path.Combine(Application.streamingAssetsPath, "Localization", langCode + ".json");
        
        if (File.Exists(filePath)) {
            string json = File.ReadAllText(filePath);
            localizedText = JsonUtility.FromJson<Dictionary<string, string>>(json);
            
            // Notify all subscribers
            OnLanguageChanged?.Invoke();
        }
    }

    public string Get(string key) {
        if (localizedText != null && localizedText.ContainsKey(key))
            return localizedText[key];
        return key; // Fallback
    }

    public delegate void LanguageChangeHandler();
    public event LanguageChangeHandler OnLanguageChanged;
}
`,
  LocalizedText: `
using UnityEngine;
using TMPro;

public class LocalizedText : MonoBehaviour {
    public string key;
    private TextMeshProUGUI textComp;

    void Start() {
        textComp = GetComponent<TextMeshProUGUI>();
        LocalizationManager.Instance.OnLanguageChanged += UpdateText;
        UpdateText();
    }

    void UpdateText() {
        textComp.text = LocalizationManager.Instance.Get(key);
        
        // Handle Chinese Font switching
        if (LocalizationManager.Instance.currentLanguage == "zh") {
             textComp.font = Resources.Load<TMP_FontAsset>("Fonts/NotoSansSC");
        }
    }
}
`,
  LanguageSelectorUI: `
using UnityEngine;
using TMPro;

public class LanguageSelectorUI : MonoBehaviour {
    public TMP_Dropdown dropdown;

    void Start() {
        dropdown.onValueChanged.AddListener(delegate {
            string selected = dropdown.options[dropdown.value].text;
            string code = ConvertToCode(selected);
            LocalizationManager.Instance.LoadLanguage(code);
        });
    }
}
`,
  LevelManager: `
using UnityEngine;

public class LevelManager : MonoBehaviour {
    public static LevelManager Instance;
    public int currentLevelIndex;
    
    // The "World" state (e.g., is gravity inverted?)
    public WorldState currentWorldState;

    void Awake() {
        if (Instance == null) Instance = this;
    }

    public void AttemptDelete() {
        // The core joke: Deletion attempts trigger level-specific failures
        if (currentLevelIndex == 1) {
            UIManager.ShowError("Error: Default Cube is Protected.");
            CubeController.Instance.PlayTauntAnimation();
        } else {
            // Check specific win conditions
            CheckWinCondition();
        }
    }
}
`,
  CubeController: `
using UnityEngine;

public class CubeController : MonoBehaviour {
    public float resistanceLevel = 1.0f;
    public bool isIndestructible = true;
    
    private Animator anim;
    private Rigidbody rb;

    void Start() {
        anim = GetComponent<Animator>();
        rb = GetComponent<Rigidbody>();
    }

    public void OnClick() {
        // Respond to player cursor interaction
        Shake();
        AudioSource.PlayClipAtPoint(gruntSound, transform.position);
    }

    public void Split() {
        // Boss Mechanic: Cube divides into 8 smaller cubes
        Instantiate(miniCubePrefab, transform.position, Quaternion.identity);
        // ... logic for 8 directions
    }
}
`,
  FakeDeleteSystem: `
using UnityEngine;

public class FakeDeleteSystem : MonoBehaviour {
    // This system handles the "Delete" keypress (X or Del)
    
    void Update() {
        if (Input.GetKeyDown(KeyCode.Delete) || Input.GetKeyDown(KeyCode.X)) {
            TriggerPunishment();
        }
    }

    void TriggerPunishment() {
        int rand = Random.Range(0, 5);
        switch(rand) {
            case 0: SpawnMoreCubes(); break;
            case 1: InvertMouseControl(); break;
            case 2: CrashSimulator(); break; // Fake BSOD or Unity Crash
            case 3: PlaySound("Blender_Error.wav"); break;
            case 4: ScaleObject(100f); break; // Make cube massive
        }
    }
}
`,
  CubeMindController: `
using UnityEngine;

public class CubeMindController : MonoBehaviour {
    // The Brain of the Cube
    public CubeMindUI ui;
    public PlayerBehaviorTracker tracker;
    
    [Header("Personality")]
    public float aggressionLevel = 0f;
    
    public void OnEvent(GameEvent e) {
        if (e.type == EventType.Fail) {
            aggressionLevel += 0.1f;
            if (tracker.failStreak > 5) {
                LockInterface(LocalizationManager.Instance.Get("cubemind.penalty.start"));
            } else {
                ui.Say(GetMockingLine(aggressionLevel));
            }
        }
        else if (e.type == EventType.Idle) {
            ui.Say(LocalizationManager.Instance.Get("cubemind.idle.1"));
        }
    }
    
    private string GetMockingLine(float aggression) {
        if (aggression > 0.8f) return LocalizationManager.Instance.Get("cubemind.high.1");
        return LocalizationManager.Instance.Get("cubemind.mild.1");
    }
}
`,
  CubeMindUI: `
using UnityEngine;
using TMPro;

public class CubeMindUI : MonoBehaviour {
    public TextMeshProUGUI speechText;
    public GameObject bubbleContainer;
    
    public void Say(string text) {
        bubbleContainer.SetActive(true);
        StartCoroutine(TypewriterEffect(text));
    }
    
    IEnumerator TypewriterEffect(string text) {
        speechText.text = "";
        foreach(char c in text) {
            speechText.text += c;
            yield return new WaitForSeconds(Random.Range(0.02f, 0.05f));
        }
        yield return new WaitForSeconds(3.0f);
        bubbleContainer.SetActive(false);
    }
}
`,
  PlayerBehaviorTracker: `
using UnityEngine;

public class PlayerBehaviorTracker : MonoBehaviour {
    public int failStreak = 0;
    public float timeSinceLastAction = 0f;
    public int actionsPerMinute = 0;
    
    void Update() {
        timeSinceLastAction += Time.deltaTime;
        
        if (timeSinceLastAction > 15.0f) {
            CubeMindController.Instance.OnEvent(new GameEvent(EventType.Idle));
            timeSinceLastAction = 0f; // Reset to avoid spam
        }
    }
    
    public void RegisterAction(ActionType type) {
        timeSinceLastAction = 0f;
        if (type == ActionType.Fail) failStreak++;
        else if (type == ActionType.Success) failStreak = 0;
    }
}
`,
  HintManager: `
using UnityEngine;
using System.Collections.Generic;

public class HintManager : MonoBehaviour {
    // Manages the HintFlow subsystem
    public static HintManager Instance;
    
    [Header("Configuration")]
    public float stuckTimeThreshold = 90f; // Seconds
    public int failThreshold = 3;
    
    private float timeSinceLastProgress = 0f;
    private int currentHintIndex = 0;
    
    // Per-level hint data
    public List<HintSequence> levelHints;

    void Update() {
        timeSinceLastProgress += Time.deltaTime;
        
        // Auto-trigger hint if stuck too long
        if (timeSinceLastProgress > stuckTimeThreshold) {
            TriggerNextHint();
        }
    }
    
    public void CheckFailStreak(int streak) {
        if (streak >= failThreshold && streak % failThreshold == 0) {
            TriggerNextHint();
        }
    }

    public void OnPainButtonPressed() {
        // Player asks for help -> Mockery then Hint
        CubeMindController.Instance.Speak(LocalizationManager.Instance.Get("cubemind.pain.1"));
        Invoke("TriggerNextHint", 2.0f);
    }
    
    private void TriggerNextHint() {
        int level = LevelManager.Instance.currentLevelIndex;
        if (currentHintIndex < levelHints[level].hints.Count) {
             string hint = levelHints[level].hints[currentHintIndex];
             // Hint strings now fetched via keys in the sequence
             CubeMindController.Instance.Speak(LocalizationManager.Instance.Get(hint));
             currentHintIndex++;
             
             // Reset stuck timer
             timeSinceLastProgress = 0f;

             // Level 4: Forced Help
             if (currentHintIndex == 4) {
                 HighlightTargetObjects();
             }
        }
    }
}
`,
  HintSequence: `
using System;
using System.Collections.Generic;

[Serializable]
public class HintSequence {
    public int levelId;
    [TextArea]
    public List<string> hints; // 4 stages: Vague -> Direction -> Advice -> Forced
}
`,
  HintTrigger: `
using UnityEngine;

public class HintTrigger : MonoBehaviour {
    // Attach to objects that should flicker during Stage 4 hint
    public bool isTarget;
    private Material mat;
    
    public void StartHighlight() {
        if (isTarget) {
            GetComponent<Animator>().Play("FlickerHighlight");
        }
    }
}
`
};