import { generated } from "../Types/generated.type";
import { language } from "../Types/lanuage";
import {
  EventJS,
  CommandJS,
  FeatureJS,
  MainJS,
  MainTS,
  FeatureTS,
  CommandTS,
  EventTS,
} from "../Utils/templates";

class ProjectBuilder {
  static buildProject(language: language) {}

  static genStructure(structure: generated, language: language) {
    switch (structure) {
      case "command":
        this.genCommand(language);
        break;
      case "event":
        this.genEvent(language);
        break;
      case "feature":
        this.genFeature(language);
        break;
    }
  }

  private static genEvent(language: language) {}
  private static genCommand(language: language) {}
  private static genFeature(language: language) {}
}

export default ProjectBuilder;
