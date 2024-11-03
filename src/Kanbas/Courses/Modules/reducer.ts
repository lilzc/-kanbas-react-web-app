import { createSlice } from "@reduxjs/toolkit";
import { modules as initialModules } from "../../Database";

interface Lesson {
  _id: string;
  name: string;
  module: string;
}

interface Module {
  _id: string;
  name: string;
  course: string;
  description: string;
  lessons: Lesson[];
}

interface ModuleWithState extends Module {
  expanded: boolean;
  editing: boolean;
}

// Type guard to ensure mod is a Module
function isModule(mod: any): mod is Module {
  return mod && typeof mod._id === 'string';
}

const initialState = {
  modules: initialModules.map((mod): ModuleWithState => {
    if (isModule(mod)) {
      return {
        ...mod,
        lessons: Array.isArray(mod.lessons) ? mod.lessons : [],
        expanded: false,
        editing: false,
      };
    }
    return {
      _id: '',
      name: '',
      course: '',
      description: '',
      lessons: [],
      expanded: false,
      editing: false,
    };
  }),
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, action) => {
      const newModule: ModuleWithState = {
        _id: new Date().getTime().toString(),
        name: action.payload.name,
        course: action.payload.course,
        description: "New Module",
        lessons: [],
        expanded: false,
        editing: false,
      };
      state.modules.push(newModule);
    },

    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (module) => module._id !== action.payload
      );
    },

    updateModule: (state, action) => {
      const index = state.modules.findIndex(
        (module) => module._id === action.payload._id
      );
      if (index !== -1) {
        state.modules[index] = {
          ...action.payload,
          editing: false,
        };
      }
    },

    editModule: (state, action) => {
      const module = state.modules.find(
        (module) => module._id === action.payload
      );
      if (module) {
        module.editing = true;
      }
    },

    addLesson: (state, action) => {
      const { moduleId, name } = action.payload;
      const module = state.modules.find(
        (module) => module._id === moduleId
      );
      if (module) {
        const newLesson: Lesson = {
          _id: new Date().getTime().toString(),
          name,
          module: moduleId,
        };
        module.lessons.push(newLesson);
      }
    },

    deleteLesson: (state, action) => {
      state.modules.forEach(module => {
        module.lessons = module.lessons.filter(
          lesson => lesson._id !== action.payload
        );
      });
    },

    updateLesson: (state, action) => {
      const { lessonId, name } = action.payload;
      state.modules.forEach(module => {
        const lesson = module.lessons.find(
          lesson => lesson._id === lessonId
        );
        if (lesson) {
          lesson.name = name;
        }
      });
    },

    setModuleExpansion: (state, action) => {
      const { moduleId, expanded } = action.payload;
      const module = state.modules.find(
        module => module._id === moduleId
      );
      if (module) {
        module.expanded = expanded;
      }
    },

    setAllModulesExpansion: (state, action) => {
      state.modules.forEach(module => {
        module.expanded = action.payload;
      });
    },
  },
});

export const {
  addModule,
  deleteModule,
  updateModule,
  editModule,
  addLesson,
  deleteLesson,
  updateLesson,
  setModuleExpansion,
  setAllModulesExpansion,
} = modulesSlice.actions;

export default modulesSlice.reducer;