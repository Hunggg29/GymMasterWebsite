using AutoMapper;
using GymMaster.API.Models;
using GymMaster.API.Models.DTO;

namespace GymMaster.API.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Plan mappings
            CreateMap<Plan, UpdatePlanDto>().ReverseMap();

            // User mappings


            // Subscription mappings
            CreateMap<Subscription, SubscriptionDto>().ReverseMap();
            CreateMap<Subscription, GetAllSubscriptionDto>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.Username))
                .ForMember(dest => dest.PlanName, opt => opt.MapFrom(src => src.Plan.Name))
                .ForMember(dest => dest.PlanImageUrl, opt => opt.MapFrom(src => src.Plan.ImageUrl))
                .ForMember(dest => dest.PlanDescription, opt => opt.MapFrom(src => src.Plan.Description))
                .ForMember(dest => dest.DurationInDays, opt => opt.MapFrom(src => src.Plan.DurationInDays))
                .ForMember(dest => dest.PlanPrice, opt => opt.MapFrom(src => src.Plan.Price))
                .ForMember(dest => dest.PaymentDate, opt => opt.MapFrom(src => src.Payment.PaymentDate))
                .ForMember(dest => dest.PaymentAmount, opt => opt.MapFrom(src => src.Payment.Amount))
                .ForMember(dest => dest.PaymentStatus, opt => opt.MapFrom(src => src.Payment.Status));

            // Payment mappings


            // Feedback mappings

            CreateMap<Feedback, CreateFeedbackDto>().ReverseMap();

            // Trainer mappings
            CreateMap<Trainer, CreateTrainerDto>().ReverseMap();
            CreateMap<Trainer, UpdateTrainerDto>().ReverseMap();

            // Training Session mappings
            CreateMap<TrainningSession, CreateTrainingSessionDto>().ReverseMap();
            CreateMap<TrainningSession, UpdateTrainingSessionDto>().ReverseMap();
            CreateMap<TrainningSession, TrainingSessionDto>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.FullName))
                .ForMember(dest => dest.UserEmail, opt => opt.MapFrom(src => src.User.Email))
                .ForMember(dest => dest.TrainerName, opt => opt.MapFrom(src => src.Trainer != null && src.Trainer.User != null ? src.Trainer.User.FullName : null))
                .ForMember(dest => dest.TrainerSpecialty, opt => opt.MapFrom(src => src.Trainer != null ? src.Trainer.Specialty : null))
                .ForMember(dest => dest.RoomName, opt => opt.MapFrom(src => src.GymRoom.RoomName))
                .ForMember(dest => dest.RoomType, opt => opt.MapFrom(src => src.GymRoom.RoomType));

            // GymRoom mappings
            CreateMap<GymRoom, UpdateGymRoomDto>().ReverseMap();
            CreateMap<GymRoom, CreateGymRoomDto>().ReverseMap();
            
            //Equipment mappings
            CreateMap<Equipment, CreateEquipmentDto>().ReverseMap();
            CreateMap<Equipment,  UpdateEquipmentDto>().ReverseMap();
        }
    }
} 